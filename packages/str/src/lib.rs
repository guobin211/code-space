/// String可以直接返回
pub fn str_to_string(s: &str) -> String {
    s.to_string()
}

/// str不能直接返回
pub fn string_to_str(s: String) -> Box<str> {
    Box::from(s)
}

#[cfg(test)]
mod tests {
    use crate::{str_to_string, string_to_str};

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
}
