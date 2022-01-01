use std::cell::RefCell;
use std::rc::Rc;
use std::rc::Weak;

#[derive(Debug, Clone)]
pub struct Node {
    pub value: i32,
    pub parent: RefCell<Weak<Node>>,
    pub children: RefCell<Vec<Rc<Node>>>,
}

#[allow(dead_code)]
pub fn repeat(call: fn(n: u32) -> u32, source: &u32) -> u32 {
    call(source.clone())
}

#[allow(dead_code)]
pub fn return_closure(data: u32) -> impl Fn(u32) -> u32 {
    move |x| x + data
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_closure() {
        let data: u32 = 10;
        let closure = return_closure(data);
        let res = closure(10);
        println!("res: {}", res);
        assert_eq!(res, 20);
    }

    #[test]
    fn test_ref() {
        let first = Node {
            value: 0,
            parent: RefCell::new(Weak::new()),
            children: RefCell::new(vec![]),
        };
        let leaf = Rc::new(first.clone());
        // 强引用
        assert_eq!(Rc::strong_count(&leaf), 1);
        // 弱引用
        assert_eq!(Rc::weak_count(&leaf), 0);
        println!("first {:?}", first);
        println!("leaf {:?}", leaf);
    }
}
