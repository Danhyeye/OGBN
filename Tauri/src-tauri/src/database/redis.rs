use anyhow::Result;

#[derive(Clone)]
pub struct RedisDB {
    client: redis::Client,
}

impl RedisDB {
    pub fn new(connection_str: &str) -> Result<Self> {
        Ok(Self {
            client: redis::Client::open(connection_str)?,
        })
    }

    pub async fn get_connection(&self) -> Result<redis::aio::Connection> {
        Ok(self.client.get_async_connection().await?)
    }
}
