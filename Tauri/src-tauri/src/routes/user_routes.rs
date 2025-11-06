use rocket::serde::json::Json;
use rocket::{get, routes, Route};

use crate::models::ApiResponse;

#[get("/health")]
async fn health() -> Json<ApiResponse<&'static str>> {
    Json(ApiResponse::success("USERS OK"))
}

pub fn get_routes() -> Vec<Route> {
    routes![health]
}
