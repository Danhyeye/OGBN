use serde::{Deserialize, Serialize};
use chrono::{DateTime, Utc};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Pin {
    pub id: String,
    pub title: String,
    pub description: Option<String>,
    pub image_url: String,
    pub owner_id: String,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CreatePinRequest {
    pub title: String,
    pub description: Option<String>,
    pub image_url: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UpdatePinRequest {
    pub title: Option<String>,
    pub description: Option<String>,
    pub image_url: Option<String>,
}
