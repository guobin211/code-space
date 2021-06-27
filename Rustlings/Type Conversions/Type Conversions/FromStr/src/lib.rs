use std::convert::TryInto;
use std::str::FromStr;

#[derive(Debug)]
pub struct Person {
    pub name: String,
    pub age: usize,
}

impl FromStr for Person {
    type Err = String;
    fn from_str(s: &str) -> Result<Person, Self::Err> {
        if s.len() == 0 {
            return Err(String::from("error"));
        }
        let props: Vec<&str> = s.split(",").collect();
        if (props.len() < 2) | (props.len() > 2) {
            return Err(String::from("must contain 2 fields exactly: name and age"));
        }
        let name = if props[0] != "" {
            String::from(props[0])
        } else {
            return Err(String::from("name field must not be empty"));
        };
        if let Ok(age) = props[1].parse::<usize>() {
            return Ok(Person { name, age });
        } else {
            return Err(String::from("cannot parse age"));
        };
    }
}
