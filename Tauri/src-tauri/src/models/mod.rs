#![allow(unused_imports)]

pub mod user;
pub mod pin;
pub mod auth;

pub use user::*;
pub use pin::*;
pub use auth::*;

// Common response types
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct ApiResponse<T> {
    pub success: bool,
    pub data: Option<T>,
    pub message: String,
    pub timestamp: i64,
}

impl<T> ApiResponse<T> {
    pub fn success(data: T) -> Self {
        Self {
            success: true,
            data: Some(data),
            message: "Success".to_string(),
            timestamp: chrono::Utc::now().timestamp(),
        }
    }
    
    pub fn error(message: String) -> Self {
        Self {
            success: false,
            data: None,
            message,
            timestamp: chrono::Utc::now().timestamp(),
        }
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct PaginationQuery {
    pub page: Option<i64>,
    pub limit: Option<i64>,
    pub sort_by: Option<String>,
    pub order: Option<String>, // asc, desc
}

impl Default for PaginationQuery {
    fn default() -> Self {
        Self {
            page: Some(1),
            limit: Some(20),
            sort_by: Some("created_at".to_string()),
            order: Some("desc".to_string()),
        }
    }
}