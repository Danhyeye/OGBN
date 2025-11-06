use anyhow::{Result, anyhow};
use regex::Regex;

lazy_static::lazy_static! {
    static ref EMAIL_RE: Regex = Regex::new(r"^[\w.+-]+@[\w.-]+\.[a-zA-Z]{2,}$").unwrap();
}

pub fn validate_email(email: &str) -> Result<()> {
    if EMAIL_RE.is_match(email) { Ok(()) } else { Err(anyhow!("Invalid email format")) }
}
