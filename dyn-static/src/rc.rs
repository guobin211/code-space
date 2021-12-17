use std::cell::RefCell;
use std::rc::Rc;
use std::rc::Weak;

#[derive(Debug, Clone)]
pub struct Node {
    value: i32,
    parent: RefCell<Weak<Node>>,
    children: RefCell<Vec<Rc<Node>>>,
}

#[cfg(test)]
mod tests {
    use super::*;

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
