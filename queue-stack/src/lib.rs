use std::fmt::Debug;
use std::fmt::Display;

mod person;
mod ref_queue;
mod ref_stack;

#[allow(dead_code)]
fn find_space_world(s: &String) -> usize {
    let bytes = s.as_bytes();
    for (i, &item) in bytes.into_iter().enumerate() {
        if item == b' ' {
            return i;
        }
    }
    s.len()
}

#[allow(dead_code)]
fn largest(arr: &[i32]) -> i32 {
    let mut large = arr[0];
    for &i in arr.iter() {
        if i > large {
            large = i;
        }
    }
    large
}

#[allow(dead_code)]
fn notify<T: Display, U: Clone + Debug>(action: T, data: U) -> String {
    format!("action: {}, data: {:?}", action, data)
}

#[allow(dead_code)]
fn notify_enum<T, U>(action: T, data: U) -> String
where
    T: Display,
    U: Debug,
{
    format!("action: {}, data: {:?}", action, data)
}

/**
 * 使用切片代替String
 */
#[allow(dead_code)]
fn find_world(s: &str) -> &str {
    let bytes = s.as_bytes();
    for (i, &item) in bytes.into_iter().enumerate() {
        if item == b' ' {
            return &s[..i];
        }
    }
    &s[..]
}

#[cfg(test)]
mod tests {

    #[test]
    fn it_works() {
        println!("test queue and stack");
        assert_eq!(2 + 2, 4);
    }

    #[test]
    fn test_std_queue() {
        println!("test test_std_queue");
    }

    #[test]
    fn find_word() {
        let s = String::from("hello world!");
        let hello = &s[..5];
        let world = &s[6..];
        println!("{} {}", hello, world);
    }
}
