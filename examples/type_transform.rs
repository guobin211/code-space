#![allow(dead_code)]

use serde::Deserialize;
use std::borrow::Cow;

#[derive(Debug, Clone)]
struct Chicken {
    name: String,
}

#[derive(Debug, Clone)]
struct Egg {
    name: String,
}

impl Chicken {
    pub fn new() -> Self {
        Chicken {
            name: "chicken".to_string(),
        }
    }
}

impl Egg {
    pub fn new() -> Self {
        Egg {
            name: "egg".to_string(),
        }
    }
}
// 实现两种类型之间的转换
impl From<Chicken> for Egg {
    fn from(chicken: Chicken) -> Self {
        Egg { name: chicken.name }
    }
}

impl From<Egg> for Chicken {
    fn from(egg: Egg) -> Self {
        Chicken { name: egg.name }
    }
}

#[derive(Deserialize, Debug)]
pub struct User<'a> {
    #[serde(borrow)]
    name: Cow<'a, str>,
    age: i32,
}

fn main() {
    let json = r#"{"name": "chicken", "age": 1}"#;
    let mut user: User = serde_json::from_str(json).unwrap();
    println!("{:?}", user);
    user.name = Cow::Owned("egg".to_string());
    println!("{:?}", user);
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_into() {
        let ck = Chicken::new();
        let egg: Egg = ck.into();
        assert_eq!(egg.name, "chicken");
        dbg!(egg);
        let ck: Chicken = Chicken::from(Egg::new());
        assert_eq!(ck.name, "egg");
        dbg!(ck);
    }

    #[test]
    fn test_type() {
        let slice = "hello";
        let str_ref: &str = slice;
        let mut str_ref_mut: String = str_ref.into();
        str_ref_mut.push_str(" world");
        println!("{}", str_ref_mut);
        assert_eq!(str_ref_mut, "hello world");
    }
}
