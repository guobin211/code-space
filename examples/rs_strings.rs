use std::{fs::read_to_string, path::Path};

fn main() {
    strings::test_strings();
    strings::test_row_str();
    let __dirname = std::env::current_dir().unwrap();
    let file = __dirname.join("src/views/home.rsx");
    if let Some(str) = include_file(file) {
        println!("str : {str}");
    }
}

fn include_file(file: impl AsRef<Path>) -> Option<String> {
    return match read_to_string(file) {
        Ok(str) => Some(str),
        Err(err) => {
            println!("include_file error : {}", err);
            None
        }
    };
}

mod strings {
    use serde::{Deserialize, Serialize};

    #[derive(Debug, Serialize, Deserialize)]
    pub struct Person {
        pub name: String,
        pub age: u8,
        pub ratings: Vec<u16>,
    }
    pub fn test_strings() {
        let str = "hello";
        let string = "world".to_string();
        let slice = &string[0..2];
        let chars = &string.chars();
        let bytes = &string.bytes();

        println!("str : {}", str);
        println!("string : {}", string);
        println!("slice : {}", slice);
        println!("chars : {:?}", chars);
        println!("bytes : {:?}", bytes);
    }

    pub fn test_row_str() {
        let str1 = r"hello";
        let str2 = r#"hello"#;
        let str3 = r##"hello "# world"##;

        println!("str1 : {}", str1);
        println!("str2 : {}", str2);
        println!("str3 : {}", str3);

        let p = r#"{"name":"jack", "age": 22, "ratings": [99, 88]}"#;
        println!("p : {}", p);
        let json: Person = serde_json::from_str(p).unwrap();
        println!("json : {:?}", json);
    }
}
