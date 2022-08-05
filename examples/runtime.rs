use deno_core::op;

#[op]
pub async fn console_error(s: String) {
    print!("\x1b[0;31m{}\x1b[0m", s);
}

#[op]
pub async fn console_warn(s: String) {
    print!("\x1b[93;40m{}\x1b[0m", s);
}

#[op]
pub async fn console_ok(s: String) {
    print!("\x1b[0;32m{}\x1b[0m", s);
}

#[allow(dead_code)]
fn console_color(s: &str) {
    print!("\x1b[93;40m{}\x1b[0m", s);
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_console_error() {
        console_color("this is yellow");
    }
}
