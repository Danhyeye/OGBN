use crate::database::MongoDB;

#[derive(Clone)]
pub struct UserService {
    mongo: MongoDB,
}

impl UserService {
    pub fn new(mongo: MongoDB) -> Self {
        Self { mongo }
    }
}
