use mongodb::{Client, Database};

use crate::config::ServerConfig;

pub mod user_doc;

///
///
/// # Arguments
///
/// * `config`:
///
/// returns: Option<Database>
///
/// # Examples
///
/// ```
///     let db = database::get_database(&config).await;
/// ```
#[allow(dead_code)]
pub async fn connect_database(config: &ServerConfig) -> Option<Database> {
    let result = Client::with_uri_str(&config.mongo_url).await;
    match result {
        Ok(client) => Some(client.database(&config.mongo_db_name)),
        Err(err) => {
            println!("Error connecting to database: {:?}", err);
            None
        }
    }
}
