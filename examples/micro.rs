use std::any::type_name;

// 过程宏 add!(1, 2)
macro_rules! add {
    ($a: expr) => {{
        $a
    }};
    ($a: expr, $b: expr) => {{
        println!("use micro_rules add ");
        $a + $b
    }};
    // add!(1, 2, 3, 4)
    ($a: expr, $($b:tt)*) => {
        {
            $a + add!($($b)*)
        }
    };
}

// 过程宏，带类型转换
macro_rules! add_as {
    ($a:expr,$b:expr,$typ:ty) => {
        $a as $typ + $b as $typ
    };
}

// 属性宏
macro_rules! make_public{
    (
     $(#[$meta:meta])*
     $vis:vis struct $struct_name:ident {
        $(
        $(#[$field_meta:meta])*
        $field_vis:vis $field_name:ident : $field_type:ty
        ),*$(,)+
    }
    ) => {

            $(#[$meta])*
            pub struct $struct_name{
                $(
                $(#[$field_meta:meta])*
                pub $field_name : $field_type,
                )*
            }
    }
}

#[derive(Debug, Copy, Clone)]
struct Position {
    pub x: i32,
    pub y: i32,
}

// 读取变量类型
pub fn type_of<T>(_: T) -> &'static str {
    type_name::<T>()
}

///
///  item 一个项（item），像一个函数，结构体，模块等。
///  block 一个块 （block）（即一个语句块或一个表达式，由花括号所包围）
///  stmt 一个语句（statement）
///  pat 一个模式（pattern）
///  expr 一个表达式（expression）
///  ty 一个类型（type）
///  ident 一个标识符（indent）
///  path 一个路径（path）（例如，foo，::std::mem::replace，transmute::<_, int>，...）
///  meta 一个元数据项；位于#[...]和#![...]属性
///  tt 一个词法树
///  vis 一个可能为空的Visibility限定词
///
fn main() {
    println!("micro 宏编程");
    let mut p = Position { x: 11, y: -11 };
    println!("{:?}", p);
    let r = add!(p.x, p.y);
    println!("r is {}", r);
    p.y += 11;
    p.x -= 11;
    println!("{:?}", p);

    let a = 1;
    let b = 2.5;
    let c = add_as!(a, b, f64);
    println!("c is {}", c);

    make_public! {
        #[derive(Debug)]
        struct Rectangle {
            width: i32,
            height: i32,
        }
    }

    let rect = Rectangle {
        width: 100,
        height: 200,
    };

    println!("rect width is {}", rect.width);

    println!("{:?}", type_of(a));
    println!("{:?}", type_of(&rect));
}
