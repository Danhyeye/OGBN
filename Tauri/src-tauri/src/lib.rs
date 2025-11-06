// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
mod models;
mod database;
mod services;
mod routes;
mod utils;
mod config;

use std::sync::Mutex;
use std::sync::mpsc;
use std::thread;
use std::io::{self, BufRead, Write};
use tauri::{State, Emitter};
use serde_json::{json, Value};

// Import các modules
use database::{MongoDB, RedisDB};
use services::{AuthService, PinService, OtpService, UserService};

// Application state
pub struct AppState {
    pub auth_service: Mutex<Option<AuthService>>,
    pub pin_service: Mutex<Option<PinService>>,
    pub user_service: Mutex<Option<UserService>>,
    pub otp_service: Mutex<Option<OtpService>>,
    pub stdio_tx: Mutex<Option<mpsc::Sender<String>>>,
}

// Tauri commands
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn init_services(state: State<'_, AppState>) -> Result<String, String> {
    // Initialize database connections
    let mongo = MongoDB::new("mongodb+srv://kztoan01:qWzh6ZKzgJ1At7kq@articlescluster.bgibe.mongodb.net/?retryWrites=true&w=majority&appName=ArticlesCluster", "pinterest_clone")
        .await
        .map_err(|e| format!("MongoDB connection failed: {}", e))?;
        
    let redis = RedisDB::new("redis://127.0.0.1/")
        .map_err(|e| format!("Redis connection failed: {}", e))?;
    
    // Initialize services
    let auth_service = AuthService::new(mongo.clone(), redis.clone());
    let pin_service = PinService::new(mongo.clone());
    let user_service = UserService::new(mongo.clone());
    let otp_service = OtpService::new(redis);
    
    // Store services in state
    *state.auth_service.lock().unwrap() = Some(auth_service);
    *state.pin_service.lock().unwrap() = Some(pin_service);
    *state.user_service.lock().unwrap() = Some(user_service);
    *state.otp_service.lock().unwrap() = Some(otp_service);
    
    Ok("Services initialized successfully".to_string())
}

#[tauri::command]
async fn start_rocket_server() -> Result<String, String> {
    thread::spawn(|| {
        let rt = tokio::runtime::Runtime::new().unwrap();
        rt.block_on(async {
            match launch_rocket().await {
                Ok(_) => println!("Rocket server started successfully"),
                Err(e) => eprintln!("Failed to start Rocket server: {}", e),
            }
        });
    });
    
    Ok("Rocket server starting...".to_string())
}

#[tauri::command]
async fn send_stdout_message(message: String) -> Result<String, String> {
    println!("STDOUT: {}", message);
    Ok("Message sent to stdout".to_string())
}

#[tauri::command]
async fn read_stdin_message() -> Result<Option<String>, String> {
    // This would be implemented with a proper stdin reader
    Ok(None)
}

#[tauri::command]
async fn get_app_status(state: State<'_, AppState>) -> Result<serde_json::Value, String> {
    let auth_initialized = state.auth_service.lock().unwrap().is_some();
    let pin_initialized = state.pin_service.lock().unwrap().is_some();
    
    Ok(json!({
        "services_initialized": auth_initialized && pin_initialized,
        "auth_service": auth_initialized,
        "pin_service": pin_initialized,
        "timestamp": chrono::Utc::now().timestamp()
    }))
}

// Rocket server launcher
async fn launch_rocket() -> Result<(), Box<dyn std::error::Error>> {
    // removed unused macro imports
    
    let mongo = MongoDB::new("mongodb+srv://kztoan01:qWzh6ZKzgJ1At7kq@articlescluster.bgibe.mongodb.net/?retryWrites=true&w=majority&appName=ArticlesCluster", "pinterest_clone").await?;
    let redis = RedisDB::new("redis://127.0.0.1/")?;
    
    let config = rocket::Config {
        port: 8080,
        address: "127.0.0.1".parse().unwrap(),
        ..rocket::Config::default()
    };
    
    rocket::custom(&config)
        .manage(AuthService::new(mongo.clone(), redis.clone()))
        .manage(PinService::new(mongo.clone()))
        .manage(UserService::new(mongo.clone()))
        .manage(OtpService::new(redis))
        .mount("/api/auth", routes::auth_routes())
        .mount("/api/pins", routes::pin_routes())
        .mount("/api/users", routes::user_routes())
        .launch()
        .await?;
        
    Ok(())
}

// Setup stdio communication
fn setup_stdio() -> mpsc::Receiver<String> {
    let (tx, rx) = mpsc::channel();
    
    thread::spawn(move || {
        let stdin = io::stdin();
        let mut stdout = io::stdout();
        
        for line in stdin.lock().lines() {
            match line {
                Ok(input) => {
                    // Try to parse as JSON
                    if let Ok(value) = serde_json::from_str::<Value>(&input) {
                        let response = json!({
                            "status": "received",
                            "echo": value,
                            "timestamp": chrono::Utc::now().timestamp()
                        });
                        
                        if let Ok(json_str) = serde_json::to_string(&response) {
                            writeln!(stdout, "{}", json_str).unwrap();
                            stdout.flush().unwrap();
                        }
                    } else {
                        // Echo plain text
                        writeln!(stdout, "Echo: {}", input).unwrap();
                        stdout.flush().unwrap();
                    }
                    
                    // Send to channel for internal processing
                    if tx.send(input).is_err() {
                        break;
                    }
                }
                Err(e) => {
                    eprintln!("Error reading stdin: {}", e);
                    break;
                }
            }
        }
    });
    
    rx
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    // Setup stdio communication
    let _stdio_rx = setup_stdio();
    
    // Initialize app state
    let app_state = AppState {
        auth_service: Mutex::new(None),
        pin_service: Mutex::new(None),
        user_service: Mutex::new(None),
        otp_service: Mutex::new(None),
        stdio_tx: Mutex::new(None),
    };
    
    tauri::Builder::default()
        .manage(app_state)
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            init_services,
            start_rocket_server,
            send_stdout_message,
            read_stdin_message,
            get_app_status
        ])
        .setup(|app| {
            // Fire global frontend event once the app is ready and start Rocket in the background.
            let app_handle = app.handle().clone();
            tauri::async_runtime::spawn(async move {
                tokio::time::sleep(std::time::Duration::from_millis(100)).await;
                let _ = app_handle.emit("app-ready", json!({}));

                // launch the Rocket REST API server
                if let Err(e) = launch_rocket().await {
                    eprintln!("Rocket server error: {}", e);
                }
            });
            Ok::<(), Box<dyn std::error::Error>>(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}