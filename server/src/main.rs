use actix_files::Files;
use actix_web::{web, App, Error, HttpResponse, HttpServer};
use serde::{Deserialize, Serialize};
use std::sync::{Arc, Mutex};

#[derive(Clone, Deserialize, Serialize)]
struct TodoItem {
    id: i32,
    name: String,
    is_done: bool,
}

#[derive(Clone, Deserialize, Serialize)]
struct TodoItemParams {
    name: String,
    is_done: bool,
}

#[derive(Clone)]
struct TodoApp {
    todos: Vec<TodoItem>,
}

async fn index() -> Result<HttpResponse, Error> {
    Ok(HttpResponse::Ok().body("Welcome {}!".to_string()))
}

async fn get_todos(app: web::Data<Arc<Mutex<TodoApp>>>) -> HttpResponse {
    HttpResponse::Ok()
        .content_type("application/json")
        .json(app.lock().unwrap().todos.clone())
}

async fn post_todos(
    app: web::Data<Arc<Mutex<TodoApp>>>,
    req_body: web::Json<TodoItemParams>,
) -> HttpResponse {
    let mut mutex = app.lock().unwrap();
    let last_todo = mutex.todos.last();

    match last_todo {
        Some(todo) => {
            let json = req_body.0;
            let todo_item = TodoItem {
                id: todo.id + 1,
                name: json.name,
                is_done: json.is_done,
            };

            mutex.todos.push(todo_item.clone());

            HttpResponse::Ok()
                .content_type("application/json")
                .json(todo_item.clone())
        }
        None => {
            let json = req_body.0;
            let todo_item = TodoItem {
                id: 1,
                name: json.name,
                is_done: json.is_done,
            };

            mutex.todos.push(todo_item.clone());

            HttpResponse::Ok()
                .content_type("application/json")
                .json(todo_item.clone())
        }
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));
    log::info!("starting HTTP server at http://localhost:8080");

    let todo_app = Arc::new(Mutex::new(TodoApp { todos: vec![] }));

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(todo_app.clone()))
            .route("/todos", web::get().to(get_todos))
            .route("/todos", web::post().to(post_todos))
            .route("/echo", web::get().to(index))
            .service(Files::new("/assets", "../native-frontend").show_files_listing())
    })
    .bind(("localhost", 8080))?
    .workers(1)
    .run()
    .await
}
