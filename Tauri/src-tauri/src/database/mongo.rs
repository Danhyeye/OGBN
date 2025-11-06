use anyhow::Result;
use mongodb::{Client, Database, Collection};

#[derive(Clone)]
pub struct MongoDB {
    db: Database,
}

impl MongoDB {
    /// Establish a new Mongo connection and return a typed wrapper.
    pub async fn new(uri: &str, db_name: &str) -> Result<Self> {
        let client = Client::with_uri_str(uri).await?;
        let database = client.database(db_name);
        Ok(Self { db: database })
    }

    /// Quickly grab a typed collection reference.
    pub fn collection<T>(&self, name: &str) -> Collection<T> {
        self.db.collection::<T>(name)
    }
}
