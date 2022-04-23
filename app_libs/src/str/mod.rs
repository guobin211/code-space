#![allow(dead_code)]

mod book;
mod into;

use std::fmt::Display;
use utf8_slice::len;

/// String可以直接返回
pub fn str_to_string(s: &str) -> String {
    s.to_string()
}

/// str不能直接返回
pub fn string_to_str(s: String) -> Box<str> {
    Box::from(s)
}

/// 获取String的长度
pub fn get_length(s: &str) -> usize {
    len(s)
}

/// User
#[derive(Debug, Default)]
struct User {
    pub name: String,
    pub age: u8,
}

impl PartialEq for User {
    fn eq(&self, other: &Self) -> bool {
        self.name == other.name && self.age == other.age
    }
}

impl User {
    pub fn set<T>(&mut self, k: &str, v: T)
    where
        T: Display,
    {
        match k {
            "name" => self.name = v.to_string(),
            "age" => self.age = v.to_string().parse::<u8>().unwrap(),
            _ => (),
        }
    }
    pub fn set_name(&mut self, name: &str) {
        self.name = name.to_string();
    }
    pub fn set_age(&mut self, age: u8) {
        self.age = age;
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn it_works() {
        let source = "Hello, world!";
        assert_eq!(source.len(), 13);
        let result: String = str_to_string(&source);
        let expected: String = "Hello, world!".to_string();
        assert_eq!(result, expected);
        assert_eq!(source, source);
        assert_eq!(source, expected);
        let boxed = string_to_str(result);
        println!("{}", boxed);
    }

    #[test]
    fn test_remove() {
        let mut s = String::from("中国人");
        let first = &s[0..3];
        println!("first char is {}", first);
        assert_eq!(first, "中");
        assert_eq!(s.len(), 9);
        println!("字符长度{}", get_length(&s));
        s.chars().for_each(|c| {
            println!("{}", c);
        });
        s.remove(0);
        let arr = s.chars().collect::<Vec<char>>();
        println!("arr first is {:?}", arr[0]);
        if let Some(index) = s.find('人') {
            println!("index of {:?}", index);
            assert_eq!(index, 3);
        }
    }

    #[test]
    fn test_life() {
        let name = "jack".to_string();
        let age = 18;
        let mut user = User { name, age };
        let mut user2 = User::default();
        user2.set_name("jack");
        user2.set_age(18);
        assert_eq!(user.age, user2.age);
        assert_eq!(user.name, user2.name);
        assert_eq!(user, user2);
        println!("{:?}", user);
        user.set("name", "tom");
        println!("{:?}", user);
    }
}
