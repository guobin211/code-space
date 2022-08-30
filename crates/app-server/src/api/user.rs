use actix_web::{web, HttpResponse};

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::resource("/")
            .route(web::get().to(|| async { HttpResponse::Ok().body("get") }))
            .route(web::post().to(|| async { HttpResponse::Ok().body("post") }))
            .route(web::put().to(|| async { HttpResponse::Ok().body("put") }))
            .route(web::delete().to(|| async { HttpResponse::Ok().body("delete") })),
    );
    cfg.service(
        web::resource("/v1")
            .route(web::get().to(|| async { HttpResponse::Ok().body("get v1") }))
            .route(web::post().to(|| async { HttpResponse::Ok().body("post v1") }))
            .route(web::put().to(|| async { HttpResponse::Ok().body("put v1") }))
            .route(web::delete().to(|| async { HttpResponse::Ok().body("delete v1") })),
    );
}
