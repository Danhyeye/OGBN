#![allow(unused_imports)]

pub mod crypto;
pub mod validation;

pub use crypto::*;
pub use validation::*;

use bcrypt::{hash, verify, DEFAULT_COST};
use anyhow::Result;

pub fn hash_password(password: &str) -> Result<String> {
    Ok(hash(password, DEFAULT_COST)?)
}

pub fn verify_password(password: &str, hash: &str) -> Result<bool> {
    Ok(verify(password, hash)?)
}

pub fn generate_token() -> String {
    uuid::Uuid::new_v4().to_string()
}