#[derive(Debug)]
pub struct Person {
    pub name: String,
    pub age: usize,
}

impl Default for Person {
    fn default() -> Person {
        Person {
            name: String::from("John"),
            age: 30,
        }
    }
}

impl From<&str> for Person {
    fn from(s: &str) -> Person {
        // Write your code here
        let mut props = s.splitn(2, ",");
        let name = props.next().unwrap();
        if name.len() == 0 {
            return Person::default();
        } else {
            if let Some(age_str) = props.next() {
                if let Ok(age) = age_str.parse() {
                    return Person {
                        name: String::from(name),
                        age,
                    };
                }
            }
        }
        Person::default()
    }
}
