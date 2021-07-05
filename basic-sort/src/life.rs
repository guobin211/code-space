#[derive(Debug)]
struct ImportantExcerpt<'a> {
    part: &'a str,
}

#[allow(dead_code)]
impl<'a> ImportantExcerpt<'a> {
    // 'a 生命周期可以省略
    fn get_part(&'a self, announcement: &str) -> &'a str {
        println!("attention : {}", announcement);
        self.part
    }
}

// 返回值取参数中最短的生命周期
#[allow(dead_code)]
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}

// 函数不能返回内部变量的引用  `&String`
#[allow(dead_code)]
fn get_inner_data() -> String {
    let res = String::from("inner data");
    res
}

#[cfg(test)]
mod tests {

    use super::*;

    #[test]
    fn test_life() {
        let important = ImportantExcerpt { part: "first" };

        println!("important is {:?}", important);

        let part = important.get_part("announcement");

        println!("part is {:?}", part);
    }

    #[test]
    fn check_life_event() {
        let name;

        {
            let jack_name = "jack";

            name = jack_name;
        }

        println!("name is {}", name);
    }
}
