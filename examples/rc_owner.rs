use std::fmt::Debug;
use std::rc::Rc;

pub fn tacks_ownership<T: Debug>(s: T) {
    println!("{:?}", s);
    // call drop for s;
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

/// 弱引用指针数量
pub fn count_weak_refs<T>(o: &Rc<T>) -> usize {
    Rc::weak_count(o)
}

/// 强引用指针数量
pub fn count_strong_refs<T>(o: &Rc<T>) -> usize {
    Rc::strong_count(o)
}

#[derive(Debug, Clone)]
pub struct Person {
    pub name: String,
    pub age: u32,
}

impl Person {
    pub fn set_name(&mut self, name: &str) {
        self.name = name.to_string();
    }
}

pub fn log_and_change(p: &mut Person) {
    p.name = "Mary".to_string();
}

fn main() {}

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

    #[test]
    fn test_person() {
        let mut person = Person {
            name: "John".to_string(),
            age: 30,
        };
        log_and_change(&mut person);
        person.set_name("Tony");
        person.name = "Jack".to_string();
        // which name should be used?
        println!("{:?}", &person);
    }

    #[test]
    fn test_count_weak_refs() {
        let jack = Person {
            name: "Jack".to_string(),
            age: 30,
        };
        let jack_ref1 = Rc::new(jack);
        assert_eq!(count_weak_refs(&jack_ref1), 0);
        let jack_ref2 = &jack_ref1;
        assert_eq!(count_weak_refs(&jack_ref2), 0);

        // 强引用
        assert_eq!(count_strong_refs(&jack_ref1), 1);
        assert_eq!(count_weak_refs(&jack_ref1), 0);

        // Clone
        let _jack_clone = Rc::clone(&jack_ref1);
        assert_eq!(count_strong_refs(&jack_ref1), 2);
        assert_eq!(count_weak_refs(&jack_ref1), 0);

        let mut user_list = Vec::new();
        user_list.push(&jack_ref1);
        assert_eq!(count_strong_refs(&jack_ref1), 2);
        assert_eq!(count_weak_refs(&jack_ref1), 0);
    }
}
