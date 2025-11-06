use rocket::serde::json::Json;
use rocket::{get, post, put, delete, routes, Route, State};

use crate::models::{ApiResponse, pin::{CreatePinRequest, UpdatePinRequest}};
use crate::services::PinService;

#[get("/health")]
async fn health() -> Json<ApiResponse<&'static str>> {
    Json(ApiResponse::success("PINS OK"))
}

#[post("/", data="<payload>")]
async fn create_pin(payload: Json<CreatePinRequest>, pin_service: &State<PinService>) -> Json<ApiResponse<&'static str>> {
    let res = pin_service.create_pin(&payload.title, &payload.description, &payload.image_url, "owner1").await.unwrap();
    Json(ApiResponse::success(res))
}

#[get("/<id>")]
async fn get_pin(id: &str, pin_service: &State<PinService>) -> Json<ApiResponse<crate::models::pin::Pin>> {
    let pin = pin_service.get_pin(id).await.unwrap();
    Json(ApiResponse::success(pin))
}

#[put("/<id>", data="<payload>")]
async fn update_pin(id: &str, payload: Json<UpdatePinRequest>, pin_service: &State<PinService>) -> Json<ApiResponse<&'static str>> {
    let res = pin_service.update_pin(id, &payload.title, &payload.description, &payload.image_url).await.unwrap();
    Json(ApiResponse::success(res))
}

#[delete("/<id>")]
async fn delete_pin(id: &str, pin_service: &State<PinService>) -> Json<ApiResponse<&'static str>> {
    let res = pin_service.delete_pin(id).await.unwrap();
    Json(ApiResponse::success(res))
}

pub fn get_routes() -> Vec<Route> {
    routes![create_pin, get_pin, update_pin, delete_pin, health]
}
