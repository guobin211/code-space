use mongodb::bson::oid::ObjectId;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, Deserialize, Serialize)]
pub struct UserDoc {
    pub _id: ObjectId,
    pub username: String,
    pub email: String,
    pub password: String,
    pub role: i8,
}
