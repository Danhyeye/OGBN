use crate::database::RedisDB;

#[derive(Clone)]
pub struct OtpService {
    redis: RedisDB,
}

impl OtpService {
    pub fn new(redis: RedisDB) -> Self {
        Self { redis }
    }
}
