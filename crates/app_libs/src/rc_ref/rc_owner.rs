#![allow(dead_code)]

use std::fmt::Debug;

pub fn tacks_ownership<T: Debug>(s: T) {
    println!("{:?}", s);
    // call drop for s;
}

/// 实现了Copy Trait的类型，可以被复制
fn takes_copy(n: u32) {
    println!("{}", n);
    // call copy for n;
}

pub fn gives_ownership() -> String {
    let rgb = String::from("rgb");
    println!("give_ownership : {}", &rgb);
    rgb
}

pub fn tacks_gives_back(s: String) -> String {
    println!("tacks_gives_back : {}", &s);
    s
}

#[derive(Copy, Clone, Debug)]
pub struct WithCopy {
    value: u32,
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_ownership() {
        let s = String::from("hello");
        let age: u32 = 22;
        tacks_ownership(s);
        // 我不可以使用
        // println!("s is : {}", &s);
        takes_copy(age);
        println!("age is {}", age);
        let can_copy = WithCopy { value: 22 };
        tacks_ownership(can_copy);
        // 我还可以使用
        println!("{:?}", can_copy);
    }
}
