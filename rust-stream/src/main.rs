use std::{thread, time::Duration};

pub mod thread_pool;

fn main() {
    let pool = thread_pool::ThreadPool::new(10);
    println!("form main thread");
    pool.execute(|| {
        println!("form thread pool 1");
    });
    pool.execute(|| {
        println!("form thread pool 2");
    });
    let timeout: u64 = 1;
    thread::sleep(Duration::from_millis(timeout));
    println!("form main thread timeout : {}s", timeout);
}
