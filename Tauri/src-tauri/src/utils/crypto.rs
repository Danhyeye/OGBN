use anyhow::Result;
use chrono::{Duration, Utc};
use jsonwebtoken::{decode, encode, Algorithm, DecodingKey, EncodingKey, Header, Validation};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
struct Claims {
    sub: String,
    exp: usize,
}

/// Create a signed JWT for a given user id using the provided secret and expiry hours.
pub fn create_jwt(user_id: &str, secret: &str, expiry_hours: i64) -> Result<String> {
    let expiration = Utc::now() + Duration::hours(expiry_hours);
    let claims = Claims {
        sub: user_id.to_string(),
        exp: expiration.timestamp() as usize,
    };
    let token = encode(&Header::default(), &claims, &EncodingKey::from_secret(secret.as_bytes()))?;
    Ok(token)
}

/// Validate a JWT and return the subject (user id) if valid.
pub fn validate_jwt(token: &str, secret: &str) -> Result<String> {
    let data = decode::<Claims>(
        token,
        &DecodingKey::from_secret(secret.as_bytes()),
        &Validation::new(Algorithm::HS256),
    )?;
    Ok(data.claims.sub)
}
