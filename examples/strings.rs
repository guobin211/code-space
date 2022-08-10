fn main() {
    strings::test_strings();
}

mod strings {
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
}
