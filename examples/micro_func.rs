// 当前时间戳
macro_rules! log_now {
    () => {{
        let now = std::time::SystemTime::now();
        println!(
            "{} ms",
            now.duration_since(std::time::UNIX_EPOCH)
                .unwrap()
                .as_millis()
        );
    }};
}

// 计算函数执行时长
macro_rules! log_time {
    ($func:ident, $arg:expr) => {{
        let now = std::time::SystemTime::now();
        $func($arg);
        println!(
            "{} ms",
            now.duration_since(std::time::UNIX_EPOCH)
                .unwrap()
                .as_millis()
        );
    }};
}

fn test_speed(title: &str) {
    println!("test_speed {}", title);
}

fn main() {
    log_now!();
    log_time!(test_speed, "hello world");
}
