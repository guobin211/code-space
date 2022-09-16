use std::{thread, time::Duration};

#[tokio::main]
async fn main() {
    let handle = thread::spawn(|| {
        let sec = 2;
        println!("线程阻塞{}秒...", sec);
        thread::sleep(Duration::from_secs(sec));
    });
    handle.join().unwrap();
    println!("线程结束");
}
