#![allow(dead_code)]
mod rc_owner;
mod rc_ref;

pub mod math {
    use std::ops::Add;

    const DEVIATION: f64 = f64::EPSILON;

    /// Rectangle struct
    /// struct 类似 class
    #[derive(Debug, Copy, Clone)]
    pub struct Rectangle {
        pub width: f64,
        pub height: f64,
    }

    /// 实现接口的写法
    impl Add<Rectangle> for Rectangle {
        type Output = Self;
        fn add(self, other: Self) -> Self {
            Rectangle {
                width: self.width + other.width,
                height: self.height + other.height,
            }
        }
    }

    /// Comparable trait
    /// trait 类似 interface
    pub trait Comparable {
        fn compare(&self, other: &Self) -> f64;
    }

    impl Comparable for f64 {
        fn compare(&self, other: &Self) -> f64 {
            if self < other {
                return other - self;
            }
            self - other
        }
    }

    pub fn compare<T>(a: T, b: T) -> bool
    where
        T: Comparable,
    {
        return a.compare(&b) > DEVIATION;
    }
}

#[cfg(test)]
mod tests {
    use std::mem;

    #[test]
    fn it_works() {
        let hello: String = String::from("hello world!");
        let s1 = &[0..5];
        let s2 = &[5..10];
        println!("helper : {}", &hello);
        println!("{:?}, {:?}", &s1, &s2);
        let res = hello.replace("h", "H");
        println!("res : {}", &res);
        println!("helper : {}", &hello);
    }

    #[test]
    fn test_utf8() {
        let c = 'z';
        let z = 'ℤ';
        let g = '国';
        let heart_eyed_cat = '😻';
        println!("{} , {} ,{}", c, z, g);
        // Unicode 值的范围从 U+0000~U+D7FF和 U+E000~U+10FFFF
        assert_eq!(mem::size_of_val(&c), mem::size_of_val(&z));
        println!(
            "heart_eyed_cat size is {}",
            mem::size_of_val(&heart_eyed_cat)
        );
        assert_eq!(mem::size_of_val(&heart_eyed_cat), 4);
    }

    #[test]
    fn test_index_str() {
        let p = "中國人";
        println!("str size is : {}", p.len());
        let s = String::from(p);
        println!("String size is {}", s.len());
        let c = p.chars().nth(0).unwrap();
        println!("char : {}", c);
        let b = p.bytes().nth(0).unwrap();
        println!("byte: {}", b);
    }
}
