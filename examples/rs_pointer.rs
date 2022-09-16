use std::{slice::from_raw_parts, str::from_utf8_unchecked};

#[derive(Debug, Default, PartialEq, Clone)]
pub struct Book {
    pub id: String,
    pub name: String,
    pub price: f32,
}

#[allow(dead_code)]
pub fn clone_book<T>(b: &T) -> T
where
    T: Clone,
{
    b.clone()
}

#[allow(dead_code)]
type Ptr = *const u8;

/// 从指针读取数据
#[allow(dead_code)]
pub fn read_form_ptr(ptr: usize, length: usize) -> String {
    unsafe {
        let parts = from_raw_parts(ptr as Ptr, length);
        let str = from_utf8_unchecked(parts);
        str.to_string()
    }
}

/// 获取指针位置
#[allow(dead_code)]
pub fn get_mem_location<T>(data: &T) -> (usize, usize)
where
    T: Clone,
{
    let ptr = data as *const T as usize;
    let size = std::mem::size_of::<T>();
    (ptr, size)
}

fn main() {}

#[cfg(test)]
mod tests {
    use std::mem;

    use super::*;

    #[test]
    fn test_mem() {
        let name = "jack";
        assert_eq!(name.len(), 4);
        println!("size of {}", mem::size_of_val(&name));
        assert_eq!(mem::size_of_val(&name), 16);
        println!("ptr is {:p}", &name);
        let ptr = name.as_ptr() as usize;
        let res = read_form_ptr(ptr, 4);
        println!("Read from ptr: {}=", res);
        assert_eq!(res, name);
        let (ptr, size) = get_mem_location(&name);
        println!("ptr is {:p}", ptr as *const u8);
        println!("size is {}", size);
        let p1 = format!("{:p}", ptr as Ptr);
        let p2 = format!("{:p}", &name);
        assert_eq!(p1, p2)
    }

    #[test]
    fn test_ref() {
        let book = Book::default();
        println!("{:?}", &book);
        let copy = clone_book(&book);
        println!("{:p}", &book);
        println!("{:p}", &copy);
        println!("{}", 1); // 默认用法,打印Display
        println!("{:o}", 9); // 八进制
        println!("{:x}", 255); // 十六进制 小写
        println!("{:X}", 255); // 十六进制 大写
        println!("{:p}", &0); // 指针
        println!("{:b}", 15); // 二进制
        println!("{:e}", 10000f32); // 科学计数(小写)
        println!("{:E}", 10000f32); // 科学计数(大写)
        println!("{:?}", "test"); // 打印Debug
        println!("{:#?}", ("test1", "test2")); // 带换行和缩进的Debug打印
        println!("{a} {b} {b}", a = "x", b = "y"); // 命名参数
    }

    #[test]
    fn test_rc() {
        let books = [
            Book {
                id: "1".to_string(),
                name: "Rust".to_string(),
                price: 100.0,
            },
            Book {
                id: "2".to_string(),
                name: "Go".to_string(),
                price: 200.0,
            },
            Book {
                id: "3".to_string(),
                name: "Python".to_string(),
                price: 300.0,
            },
        ];
        let rust = &books[0];
        println!("{:?}", rust);
        let copy: _ = clone_book(&rust);
        println!("{:?}", copy);
        assert_eq!(rust, copy)
    }
}
