use super::*;
use std::env;

/// Load application configuration from environment variables or fall back to defaults.
pub fn load_config() -> AppConfig {
    let defaults = AppConfig::default();

    let database = DatabaseConfig {
        connection_string: env::var("DATABASE_URL").unwrap_or(defaults.database.connection_string.clone()),
        database_name: env::var("DATABASE_NAME").unwrap_or(defaults.database.database_name.clone()),
    };

    let redis = RedisConfig {
        connection_string: env::var("REDIS_URL").unwrap_or(defaults.redis.connection_string.clone()),
        otp_expiry_seconds: defaults.redis.otp_expiry_seconds,
    };

    let server = ServerConfig {
        host: env::var("SERVER_HOST").unwrap_or(defaults.server.host.clone()),
        port: env::var("SERVER_PORT")
            .ok()
            .and_then(|v| v.parse().ok())
            .unwrap_or(defaults.server.port),
    };

    let auth = AuthConfig {
        jwt_secret: env::var("JWT_SECRET").unwrap_or(defaults.auth.jwt_secret.clone()),
        token_expiry_hours: env::var("TOKEN_EXPIRY_HOURS")
            .ok()
            .and_then(|v| v.parse().ok())
            .unwrap_or(defaults.auth.token_expiry_hours),
    };

    AppConfig {
        database,
        redis,
        server,
        auth,
    }
}
