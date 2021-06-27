pub fn fizz_if_foo(fizzish: &str) -> &str {
    if fizzish == "fizz" {
        println!("bar");
        "fuzz"
    } else if fizzish == "baz" {
        println!("bar");
        "baz"
    } else {
        fizzish
    }
}

