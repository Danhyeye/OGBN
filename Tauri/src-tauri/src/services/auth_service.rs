use crate::database::{MongoDB, RedisDB};
use anyhow::Result;
use crate::models::{User};
use crate::utils::{hash_password, verify_password, generate_token, create_jwt};
use mongodb::bson::{doc};
use chrono::Utc;
use uuid::Uuid;

const USERS_COLLECTION: &str = "users";

#[derive(Clone)]
pub struct AuthService {
    mongo: MongoDB,
    redis: RedisDB,
}

impl AuthService {
    pub fn new(mongo: MongoDB, redis: RedisDB) -> Self {
        Self { mongo, redis }
    }

    pub async fn health_check(&self) -> Result<&'static str> {
        Ok("AuthService healthy")
    }

    pub async fn register(&self, email: &str, password: &str, username: &str) -> Result<&'static str> {
        let coll = self.mongo.collection::<User>(USERS_COLLECTION);
        if coll.find_one(doc! {"email": email}, None).await?.is_some() {
            anyhow::bail!("Email already registered");
        }
        let hashed = hash_password(password)?;
        let new_user = User {
            id: Uuid::new_v4().to_string(),
            email: email.to_string(),
            username: username.to_string(),
            password_hash: hashed,
            created_at: Utc::now(),
        };
        coll.insert_one(new_user, None).await?;
        Ok("User registered")
    }

    pub async fn verify_otp(&self, email: &str, otp: &str) -> Result<&'static str> {
        let mut conn = self.redis.get_connection().await?;
        let key = format!("otp:{}", email);
        let stored: Option<String> = redis::Cmd::get(&key).query_async(&mut conn).await?;
        match stored {
            Some(s) if s == otp => {
                let _ : () = redis::Cmd::del(&key).query_async(&mut conn).await?;
                Ok("OTP verified")
            }
            _ => anyhow::bail!("Invalid OTP"),
        }
    }

    pub async fn login(&self, email: &str, password: &str) -> Result<String> {
        let coll = self.mongo.collection::<User>(USERS_COLLECTION);
        if let Some(user) = coll.find_one(doc! {"email": email}, None).await? {
            let valid = verify_password(password, &user.password_hash)?;
            if !valid {
                anyhow::bail!("Invalid credentials");
            }
            // create jwt
            let token = create_jwt(&user.id, "secret", 24)?;
            Ok(token)
        } else {
            anyhow::bail!("User not found");
        }
    }
}
