pub fn factorial(num: u64) -> u64 {
    let mut start = 1;
    for n in 1..=num {
        start = start * n
    }
    start
}
