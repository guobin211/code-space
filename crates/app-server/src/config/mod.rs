use mongodb::{Client, Database};

#[derive(Debug)]
pub struct ServerConfig {
    pub mongo_url: &'static str,
    pub mongo_db_name: &'static str,
    pub port: u16,
    pub origin: &'static str,
    pub local_url: &'static str,
}

impl ServerConfig {
    pub fn new() -> Self {
        ServerConfig {
            port: 8999,
            mongo_url: "mongodb://localhost:27017",
            mongo_db_name: "rust_api_server",
            origin: "127.0.0.1:8999",
            local_url: "http://127.0.0.1:8999",
        }
    }

    pub async fn get_mongo(&self) -> Option<Client> {
        if let Ok(client) = Client::with_uri_str(self.mongo_url).await {
            return Some(client);
        } else {
            panic!("Failed to connect to mongodb");
        }
    }

    pub fn get_database(&self, client: &Client, name: &str) -> Database {
        client.database(&name)
    }
}
