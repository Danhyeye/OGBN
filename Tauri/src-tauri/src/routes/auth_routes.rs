use rocket::serde::json::Json;
use rocket::{get, post, Route, State, routes};

use crate::models::{ApiResponse, auth::{LoginRequest, RegisterRequest, OtpVerifyRequest}};
use crate::services::AuthService;

#[post("/login", data = "<payload>")]
async fn login(payload: Json<LoginRequest>, auth_service: &State<AuthService>) -> Json<ApiResponse<String>> {
    let res = auth_service.login(&payload.email, &payload.password).await.unwrap_or("Error".to_string());
    Json(ApiResponse::success(res))
}

#[post("/register", data="<payload>")]
async fn register(payload: Json<RegisterRequest>, auth_service: &State<AuthService>) -> Json<ApiResponse<&'static str>> {
    let res = auth_service.register(&payload.email, &payload.password, &payload.username).await.unwrap_or("Error");
    Json(ApiResponse::success(res))
}

#[post("/verify-otp", data="<payload>")]
async fn verify_otp(payload: Json<OtpVerifyRequest>, auth_service: &State<AuthService>) -> Json<ApiResponse<&'static str>> {
    let res = auth_service.verify_otp(&payload.email, &payload.otp).await.unwrap_or("Error");
    Json(ApiResponse::success(res))
}

#[get("/health")]
async fn health() -> Json<ApiResponse<&'static str>> {
    Json(ApiResponse::success("AUTH OK"))
}

pub fn get_routes() -> Vec<Route> {
    routes![login, register, verify_otp, health]
}
