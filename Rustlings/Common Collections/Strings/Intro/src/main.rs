fn main() {
    // put you code here to launch it
    for c in "नमस्ते".chars() {
        println!("{}", c);
    }
    for c in "hello".chars() {
        // to unicode
        println!("{}", c as i32);
    }
}
