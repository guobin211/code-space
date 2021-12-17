use std::{error::Error, fs};

#[allow(dead_code)]
pub struct Cache<T>
where
    T: Fn(u32) -> u32,
{
    calculator: T,
    value: Option<u32>,
}

#[allow(dead_code)]
impl<T> Cache<T>
where
    T: Fn(u32) -> u32,
{
    fn new(calculator: T) -> Cache<T> {
        Cache {
            calculator,
            value: None,
        }
    }

    fn value(&mut self, arg: u32) -> u32 {
        match self.value {
            Some(value) => value,
            None => {
                let value = (self.calculator)(arg);
                self.value = Some(value);
                value
            }
        }
    }
}

#[derive(Debug)]
pub struct Config {
    filename: String,
    query: String,
}

impl Config {
    #[allow(dead_code)]
    pub fn new(args: Vec<String>) -> Result<Config, &'static str> {
        if args.len() < 3 {
            return Err("arguments is not enough");
        }
        let filename = args[1].clone();
        let query = args[2].clone();
        Ok(Config { filename, query })
    }
}

pub fn run(config: Config) -> Result<(), Box<dyn Error>> {

    let content = fs::read_to_string(&config.filename)?;
    let list = search(&config.query, &content);
    println!("find list {:?}", list.len());
    for elem in list.iter() {
        println!("{}", elem);
    }
    Ok(())
}

pub fn search<'a>(query: &str, contents: &'a str) -> Vec<&'a str> {
    contents
        .lines()
        .filter(|line| line.contains(query))
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_calculator() {
        let mut expensive = Cache::new(|value| {
            println!("input value {}", value);
            value
        });
        let v1 = expensive.value(22);
        let v2 = expensive.value(11);
        println!("cache value {:?}", expensive.value);
        assert_eq!(v1, v2);
    }

    #[test]
    fn test_search() {
        let query = "hello world";
        let content = "hello world
        hello2world
        hello3world
        hello4world";
        let res = search(&query, &content);
        println!("res is {:?}", res);
    }

    #[test]
    fn test_run() {
        let config = Config {
            filename: String::from("README.md"),
            query: String::from("code-space"),
        };
        run(config).unwrap();
    }
}
