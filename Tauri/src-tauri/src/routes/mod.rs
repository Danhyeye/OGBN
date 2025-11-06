#![allow(unused_imports)]

pub mod auth_routes;
pub mod pin_routes;
pub mod user_routes;

pub use auth_routes::*;
pub use pin_routes::*;
pub use user_routes::*;

use rocket::Route;

pub fn auth_routes() -> Vec<Route> {
    auth_routes::get_routes()
}

pub fn pin_routes() -> Vec<Route> {
    pin_routes::get_routes()
}

pub fn user_routes() -> Vec<Route> {
    user_routes::get_routes()
}
