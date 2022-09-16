use std::{
    io::{Read, Write},
    net::{TcpListener, TcpStream},
    sync::{mpsc, Arc, Mutex},
    thread,
};

static HELLO: &str = r#"<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Hello!</title>
  </head>
  <body>
    <h1>Hello World Rust!</h1>
  </body>
</html>
"#;

static NOT_FOUND: &str = r#"<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>404 Page Not Found!</title>
  </head>
  <body>
    <h1>404!</h1>
    <p>Sorry, I don't know what you're asking for.</p>
  </body>
</html>
"#;

static RESPONSE_OK: &str = "HTTP/1.1 200 OK";
static RESPONSE_NOT_FOUND: &str = "HTTP/1.1 404 NOT FOUND";
static REQUEST_GET: &str = "GET / HTTP/1.1\r\n";

fn main() {
    let tcp_port = "127.0.0.1:8990";
    match TcpListener::bind(&tcp_port) {
        Ok(listener) => {
            println!("starting http server on http://{}", &tcp_port);
            let pool = ThreadPool::new(4);
            for stream in listener.incoming() {
                let stream = stream.unwrap();
                pool.execute(|| {
                    handle_connection(stream);
                });
            }
        }
        Err(err) => {
            println!("error: {}", err);
            panic!("failed to bind to {}", &tcp_port);
        }
    };
}

/// Job
fn handle_connection(mut stream: TcpStream) {
    let mut buffer = [0; 1024];
    stream.read(&mut buffer).unwrap();

    let get = REQUEST_GET.as_bytes();
    if buffer.starts_with(get) {
        let response = format!(
            "{}\r\nContent-Length: {}\r\n\r\n{}",
            RESPONSE_OK,
            HELLO.len(),
            HELLO
        );
        stream.write(response.as_bytes()).unwrap();
        stream.flush().unwrap();
    } else {
        let response = format!(
            "{}\r\nContent-Length: {}\r\n\r\n{}",
            RESPONSE_NOT_FOUND,
            NOT_FOUND.len(),
            NOT_FOUND
        );
        stream.write(response.as_bytes()).unwrap();
        stream.flush().unwrap();
    }
}

pub struct ThreadPool {
    pub workers: Vec<Worker>,
    pub sender: mpsc::Sender<Message>,
}

/// 工作线程
pub struct Worker {
    pub id: usize,
    pub thread: Option<thread::JoinHandle<()>>,
}

/// 工作线程的具体任务
type Job = Box<dyn FnOnce() + Send + 'static>;

/// 线程同步消息
pub enum Message {
    NewJob(Job),
    Terminate,
}

/// 线程池
impl ThreadPool {
    pub fn new(size: usize) -> ThreadPool {
        assert!(size > 0);
        let (tx, rx) = mpsc::channel::<Message>();
        let mut workers: Vec<Worker> = Vec::with_capacity(size);
        let rx = Arc::new(Mutex::new(rx));
        let receiver = rx.clone();

        for id in 0..size {
            workers.push(Worker::new(id, Arc::clone(&receiver)));
        }

        ThreadPool {
            workers,
            sender: tx,
        }
    }

    pub fn execute<F>(&self, f: F)
    where
        F: FnOnce() + Send + 'static,
    {
        let job = Box::new(f);

        self.sender.send(Message::NewJob(job)).unwrap();
    }
}

/// 清理线程池
impl Drop for ThreadPool {
    fn drop(&mut self) {
        for _ in &self.workers {
            self.sender.send(Message::Terminate).unwrap();
        }

        for worker in &mut self.workers {
            if let Some(td) = worker.thread.take() {
                td.join().unwrap();
            }
        }
    }
}

impl Worker {
    fn new(id: usize, receiver: Arc<Mutex<mpsc::Receiver<Message>>>) -> Worker {
        let thread = thread::spawn(move || loop {
            if let Ok(message) = receiver.lock().unwrap().recv() {
                match message {
                    Message::NewJob(job) => {
                        println!("Worker {} got a job; executing...", id);
                        job();
                    }
                    Message::Terminate => {
                        println!("Worker {} was told to terminate...", id);
                        break;
                    }
                }
            }
        });
        Worker {
            id,
            thread: Some(thread),
        }
    }
}
