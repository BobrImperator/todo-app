use actix_files::Files;
use actix_web::{middleware, web, App, Error, HttpResponse, HttpServer};
use std::env;

async fn index() -> Result<HttpResponse, Error> {
    Ok(HttpResponse::Ok().body("Welcome {}!".to_string()))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));
    log::info!("starting HTTP server at http://localhost:8080");

    HttpServer::new(move || {
        App::new()
            .route("/echo", web::get().to(index))
            .service(Files::new("/assets", "../native-frontend").show_files_listing())
    })
    .bind(("localhost", 8080))?
    .workers(1)
    .run()
    .await
}
