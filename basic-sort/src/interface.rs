use std::fmt::Debug;

/// macro_rules 宏编程
#[allow(unused_macros)]
macro_rules! find_min {
    ($x: expr) => {
        $x
    };
    ($x: expr, $($y: expr),  +) => {
        std::cmp::min($x, find_min!($($y), +))
    }
}

#[allow(dead_code)]
#[derive(Debug, Clone, Copy)]
struct Book {
    name: &'static str,
    author: &'static str,
    year: u32,
}

/// 不可变引用函数
#[allow(dead_code)]
fn print_book_author(book_ref: &Book) {
    println!("book author is {}", book_ref.author)
}

/// 可变引用函数（借用取得所有权）
#[allow(dead_code)]
fn change_book_name(book_ref_mut: &mut Book) {
    book_ref_mut.name = "change book name";
    println!("book is {:?}", book_ref_mut)
}

/// 生命周期借用
#[allow(dead_code)]
fn change_year<'a>(year: &'a u32, book: &mut Book) {
    book.year = *year;
}

/// 接口
pub trait PrintOption {
    fn console_log(self);
}

/// 对范型实现接口
impl<T> PrintOption for T
where
    Option<T>: Debug,
{
    fn console_log(self) {
        println!("{:?}", Some(self));
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_console() {
        let list = vec![1, 2, 3, 4];
        list.console_log();
    }

    #[test]
    fn test_mut_ref() {
        let book = Book {
            name: "蜀道难",
            author: "李白",
            year: 999,
        };
        let mut book_mut = book;
        print_book_author(&book);
        change_book_name(&mut book_mut);
        println!("book is {:?}", book);
        println!("book_mut is {:?}", &book_mut);
        change_year(&1001, &mut book_mut);
        println!("book_mut is {:?}", &book_mut);
    }
}
