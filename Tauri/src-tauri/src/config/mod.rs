#![allow(unused_imports)]

pub mod config;
pub use config::*;

use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AppConfig {
    pub database: DatabaseConfig,
    pub redis: RedisConfig,
    pub server: ServerConfig,
    pub auth: AuthConfig,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DatabaseConfig {
    pub connection_string: String,
    pub database_name: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RedisConfig {
    pub connection_string: String,
    pub otp_expiry_seconds: usize,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ServerConfig {
    pub host: String,
    pub port: u16,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AuthConfig {
    pub jwt_secret: String,
    pub token_expiry_hours: i64,
}

impl Default for AppConfig {
    fn default() -> Self {
        Self {
            database: DatabaseConfig {
                connection_string: "mongodb+srv://kztoan01:qWzh6ZKzgJ1At7kq@articlescluster.bgibe.mongodb.net/?retryWrites=true&w=majority&appName=ArticlesCluster".to_string(),
                database_name: "pinterest_clone".to_string(),
            },
            redis: RedisConfig {
                connection_string: "redis://127.0.0.1/".to_string(),
                otp_expiry_seconds: 300, // 5 minutes
            },
            server: ServerConfig {
                host: "127.0.0.1".to_string(),
                port: 6379,
            },
            auth: AuthConfig {
                jwt_secret: "your-secret-key".to_string(),
                token_expiry_hours: 24,
            },
        }
    }
}