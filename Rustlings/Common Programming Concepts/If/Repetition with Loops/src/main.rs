fn main() {
    let mut counter = 0;

    let result = loop {
        println!("loop times {}", counter);
        counter += 1;
        if counter == 10 {
            break counter * 2;
        }
    };

    println!("the result is {}", result);
}
