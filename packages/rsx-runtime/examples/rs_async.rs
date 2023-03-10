use std::{thread::sleep, time::Duration};

#[tokio::main]
async fn main() {
    let t1 = tokio::spawn(async {
        let r1 = read_file1().await;
        println!("r1: {}", r1);
    });

    let t2 = tokio::spawn(async {
        let r2 = read_file2().await;
        println!("r2: {}", r2);
    });
    let _ = tokio::join!(t1, t2);
}

async fn read_file1() -> String {
    sleep(Duration::from_secs(4));
    String::from("read_file1")
}

async fn read_file2() -> String {
    sleep(Duration::from_secs(2));
    String::from("read_file2")
}
