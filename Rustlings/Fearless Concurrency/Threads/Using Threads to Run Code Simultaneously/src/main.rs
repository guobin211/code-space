use std::thread;
use std::time::Duration;

fn main() {
    set_interval(
        || {
            println!("set_interval call");
        },
        1,
    );
    set_timeout(log, 1);
    thread::sleep(Duration::from_secs(2));
    println!("after sleep 2 s");
}

#[allow(dead_code)]
fn log() {
    println!("set_timeout call")
}

#[allow(dead_code)]
fn set_timeout(f: fn(), time: u64) {
    thread::sleep(Duration::from_secs(time));
    f();
}

#[allow(dead_code)]
fn set_interval(f: fn(), time: u64) {
    loop {
        f();
        thread::sleep(Duration::from_secs(time));
    }
}
