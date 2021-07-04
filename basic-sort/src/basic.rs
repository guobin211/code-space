use std::{cmp, fmt};

#[allow(dead_code)]
fn reverse<T, E>(tuple: (T, E)) -> (E, T) {
    let (a, b) = tuple;
    (b, a)
}

#[allow(dead_code)]
fn apply<F>(f: F) where F: Fn() {
    f()
}

#[allow(dead_code)]
fn call<F: Fn()>(f: F) {
    f()
}

#[allow(dead_code)]
fn create_fn(p: String) -> impl Fn() {
   let txt = "inner text".to_owned();
   move || println!("params is {}, {}", p, txt)
}

pub struct CustomerTupleClass(i32);

#[allow(dead_code)]
#[derive(PartialEq, Debug)]
pub enum CustomerEnumClass {
    SUCCESS,
    ERROR,
}

#[derive(Debug)]
pub struct CustomerDataClass {
    id: String,
    title: String,
}

impl fmt::Display for CustomerTupleClass {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", self.0)
    }
}

impl fmt::Display for CustomerEnumClass {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        return match &self {
            CustomerEnumClass::SUCCESS => {
                write!(f, "SUCCESS")
            }
            CustomerEnumClass::ERROR => {
                write!(f, "ERROR")
            }
        };
    }
}

impl fmt::Display for CustomerDataClass {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "\"id\":{}, \"title\":{}", self.id, self.title)
    }
}

impl cmp::PartialEq for CustomerDataClass {
    fn eq(&self, other: &CustomerDataClass) -> bool {
        self.id == other.id
    }
}

#[cfg(test)]
mod tests {
    use super::CustomerEnumClass;
    use crate::basic::CustomerDataClass;

    #[test]
    fn test_format() {
        let c: CustomerEnumClass = CustomerEnumClass::SUCCESS;
        println!("C is {}", c);
        assert_eq!(c, CustomerEnumClass::SUCCESS);
    }

    #[test]
    fn test_eq() {
        let data = CustomerDataClass {
            id: String::from("10010"),
            title: String::from("CustomerDataClass"),
        };
        println!("data is {}", data);
        let data2 = CustomerDataClass {
            id: String::from("10010"),
            title: String::from("CustomerDataClass 2"),
        };
        assert_eq!(data, data2);
        assert_eq!(data != data2, false);
    }
}
