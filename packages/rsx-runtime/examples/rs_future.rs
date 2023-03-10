use std::{
    future::Future,
    pin::Pin,
    task::{Context, Poll},
    thread::{self, sleep},
    time::{Duration, Instant, SystemTime},
};

struct ReadFileFuture {
    /// 超时时间
    timeout: Instant,
}

/// 实现Future可以使用await
impl Future for ReadFileFuture {
    type Output = String;

    fn poll(self: Pin<&mut Self>, context: &mut Context) -> Poll<Self::Output> {
        println!("Future is Polling...");
        if self.timeout < Instant::now() {
            Poll::Ready("ReadFileFuture has Completed".to_string())
        } else {
            let waker = context.waker().clone();
            let timeout = self.timeout;
            thread::spawn(move || {
                let current = Instant::now();
                if current < timeout {
                    sleep(timeout - current);
                }
                // 唤醒异步任务
                waker.wake();
            });
            Poll::Pending
        }
    }
}

async fn read_file() -> String {
    sleep(Duration::from_secs(2));
    "read_file!".to_string()
}

/// 简单计算函数的耗时
pub fn test_func_speed(f: fn() -> ()) {
    let now = SystemTime::now();
    f();
    let cost = SystemTime::now().duration_since(now).unwrap().as_millis();
    println!("cost: {} ms", cost);
}

pub fn test_fn<F>(f: F)
where
    F: FnOnce() -> (),
{
    let now = SystemTime::now();
    f();
    let cost = SystemTime::now().duration_since(now).unwrap().as_millis();
    println!("cost: {} ms", cost);
}

#[tokio::main]
async fn main() {
    let now = SystemTime::now();
    let t1 = tokio::spawn(async {
        let f = ReadFileFuture {
            timeout: Instant::now() + Duration::from_secs(4),
        };
        let s = f.await;
        println!("thread_1 : {:?}", s);
    });
    let t2 = tokio::spawn(async {
        let s = read_file().await;
        println!("thread_2 : {:?}", s);
    });

    let res = tokio::join!(t1, t2);
    match res {
        (Ok(res1), Ok(res2)) => {
            println!("res1: {:?}", res1);
            println!("res2: {:?}", res2);
        }
        _ => println!("tokio::join err"),
    }

    let count = SystemTime::now().duration_since(now).unwrap().as_secs();
    println!("count: {} s", count);

    test_func_speed(|| {
        thread::sleep(Duration::from_secs(1));
        println!("test_func_speed");
    })
}
