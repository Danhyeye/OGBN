use crate::database::MongoDB;
use crate::models::Pin;
use mongodb::bson::doc;
use chrono::Utc;
use uuid::Uuid;

#[derive(Clone)]
pub struct PinService {
    mongo: MongoDB,
}

impl PinService {
    pub fn new(mongo: MongoDB) -> Self {
        Self { mongo }
    }

    pub async fn create_pin(&self, title: &str, desc: &Option<String>, url: &str, owner_id: &str) -> Result<&'static str, anyhow::Error> {
        let coll = self.mongo.collection::<Pin>("pins");
        let new_pin = Pin {
            id: Uuid::new_v4().to_string(),
            title: title.to_string(),
            description: desc.clone(),
            image_url: url.to_string(),
            owner_id: owner_id.to_string(),
            created_at: Utc::now(),
        };
        coll.insert_one(new_pin, None).await?;
        Ok("Pin created")
    }

    pub async fn get_pin(&self, id: &str) -> Result<Pin, anyhow::Error> {
        let coll = self.mongo.collection::<Pin>("pins");
        let pin = coll.find_one(doc! {"id": id}, None).await?.ok_or_else(|| anyhow::anyhow!("Pin not found"))?;
        Ok(pin)
    }

    pub async fn update_pin(&self, id: &str, title: &Option<String>, desc: &Option<String>, url: &Option<String>) -> Result<&'static str, anyhow::Error> {
        let coll = self.mongo.collection::<Pin>("pins");
        let mut update_doc = doc! {};
        if let Some(t) = title { update_doc.insert("title", t); }
        if let Some(d) = desc { update_doc.insert("description", d); }
        if let Some(u) = url { update_doc.insert("image_url", u); }
        if update_doc.is_empty() {
            return Ok("Nothing to update");
        }
        coll.update_one(doc! {"id": id}, doc! {"$set": update_doc}, None).await?;
        Ok("Pin updated")
    }

    pub async fn delete_pin(&self, id: &str) -> Result<&'static str, anyhow::Error> {
        let coll = self.mongo.collection::<Pin>("pins");
        coll.delete_one(doc! {"id": id}, None).await?;
        Ok("Pin deleted")
    }
}
