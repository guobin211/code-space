#[derive(Debug)]
pub struct Person {
    name: String,
    age: usize,
    sex: Sex,
}

#[derive(Debug, PartialEq)]
pub enum Sex {
    MAN,
    WOMEN,
}

impl Person {
    #[allow(dead_code)]
    fn is_man(&self) -> bool {
        self.sex == Sex::MAN
    }

    #[allow(dead_code)]
    fn new() -> Person {
        Person {
            name: String::from(""),
            sex: Sex::MAN,
            age: 0,
        }
    }
}

#[allow(dead_code)]
pub fn create_person(name: String, age: usize) -> Person {
    Person {
        name,
        age,
        sex: Sex::MAN,
    }
}

#[allow(dead_code)]
pub fn update_person(p: &mut Person, age: usize) {
    p.age = age;
}

#[allow(dead_code)]
pub fn merger_person(name: String, p: Person) -> Person {
    Person {
        name,
        sex: Sex::WOMEN,
        ..p
    }
}
