#![allow(dead_code)]

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
}
