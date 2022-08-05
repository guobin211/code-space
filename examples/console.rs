#[allow(dead_code)]
fn console_color(s: &str) {
    print!("\x1b[93;40m{}\x1b[0m", s);
}

fn main() {
    console_color("hello world\n");
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_console_error() {
        console_color("this is yellow");
    }
}
