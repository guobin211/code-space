extern crate core;

use actix_web::{web, App, HttpServer, Responder};
use anyhow::Result;

mod api;
mod config;
mod database;
mod home;
mod middleware;
mod models;

/**
 * 1. read config file
 * 2. start server with config
 * 3. api handle request
 * 4. auth check
 * 5. db handle request
 * 6. response
 */
#[actix_web::main]
async fn main() -> Result<()> {
    let server_config = config::ServerConfig::new();
    if let Some(client) = server_config.get_mongo().await {
        let db = server_config.get_database(&client, server_config.mongo_db_name);
        println!("server run at {}", server_config.local_url);
        let project_dir = std::env::current_dir()?;
        println!("project dir: {:?}", project_dir);
        HttpServer::new(move || {
            App::new()
                .app_data(web::Data::new(db.clone()))
                .route("/", web::get().to(index))
                .route("/home", web::get().to(home::home_page))
                .service(web::scope("/api/users").configure(api::user::config))
        })
        .bind(server_config.origin)?
        .run()
        .await?;
    }
    Ok(())
}

async fn index() -> impl Responder {
    "Hello world!"
}
