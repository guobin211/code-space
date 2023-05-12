use std::{collections::HashMap, mem::size_of_val};

mod generics {

    #[derive(Debug)]
    enum Item {
        String(String),
        Number(f32),
    }

    pub fn make_array() {
        let mut arr: Vec<Item> = vec![];
        arr.push(Item::String(String::from("Hello")));
        let n = 1.4;
        arr.push(Item::Number(n));
        println!("{:?}", arr);
    }

    pub fn test_find_item() {
        let list = vec![1, 2, 3, 4, 5];
        let result = find_largest_element(&list);
        println!("{:?}", result);
    }

    // 查找最大的元素
    fn find_largest_element<T: Ord + Clone>(arr: &Vec<T>) -> Option<T> {
        if arr.is_empty() {
            return None;
        }
        let mut largest = &arr[0];
        for item in arr {
            if item > largest {
                largest = item;
            }
        }
        Some(largest.clone())
    }
}

fn main() {
    test_ownership();
    test_size_of_str();
    test_append_string();
    generics::make_array();
    generics::test_find_item();
}

fn test_ownership() {
    let mut hello = String::from("hello world");
    take_ownership(&hello);
    // take_ownership(hello);
    change_first_word(&mut hello);
    println!("{}", hello);
}

fn take_ownership(string: &String) {
    println!("take_ownership: {}", string);
}

fn change_first_word(string: &mut String) {
    string.replace_range(0..1, "H");
}

fn test_size_of_str() {
    println!("size of &str: {}", size_of_val("😄🤩"));
    for c in "中国人".chars() {
        println!("{}", c);
    }
    for b in "中国人".bytes() {
        println!("{}", b);
    }
    let mut map: HashMap<String, &str> = HashMap::new();
    map.insert(String::from("1"), "1");
    map.insert(String::from("c"), "c");
    map.insert(String::from("中"), "中");
    map.insert(String::from("u"), "😄");
    map.into_values()
        .for_each(|v| println!("{}的length: {}, 内存: {}字节", &v, v.len(), size_of_val(v)));
}

fn test_append_string() {
    let res = append_string("hello", "world");
    println!("{:?}", res);
}

fn append_string<T: ToString>(s: T, a: T) -> String {
    let mut s = s.to_string();
    s.push_str(a.to_string().as_str());
    s
}
