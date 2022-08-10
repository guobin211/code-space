use lazy_static::lazy_static;

use std::fmt::Arguments;
use std::io::{stdout, Stdout, Write};
use std::sync::{Arc, Mutex};

lazy_static! {
    pub static ref WRITER: Arc<Mutex<Stdout>> = Arc::new(Mutex::new(stdout()));
}

fn _print(arg: Arguments) {
    WRITER
        .lock()
        .and_then(|mut mutex| {
            mutex.write_fmt(arg).unwrap();
            Ok(())
        })
        .unwrap();
}

macro_rules! console_log {
    ($($arg:tt)*) => (_print(format_args!($($arg)*)));
}

fn console_color(s: &str) {
    print!("\x1b[93;40m{}\x1b[0m", s);
}

fn native_print() {
    let output: Stdout = stdout();
    output.lock().write(b"hello native print\n").unwrap();
}

fn main() {
    let hello = "hello 1\n";
    {
        console_color(hello);
        let hello = "hello 2\n";
        console_color(hello);
    }
    console_color(hello);
    native_print();
    console_log!("hello \n");
    console_log!("world \n");
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_console_error() {
        console_color("this is yellow");
    }
}
