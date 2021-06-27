pub mod thread_pool;

fn main() {
    let pool = thread_pool::ThreadPool::new(10);
    println!("form main thread");
    pool.execute(|| {
        println!("form thread pool");
    });
    // main thread first run
    println!("form main thread");
}
