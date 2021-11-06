use std::ops::Deref;
use std::rc::Rc;

pub struct MyIteratorWrapper<'a, T> {
    slice: &'a [T],
}

impl<'a, T> Iterator for MyIteratorWrapper<'a, T> {
    type Item = &'a T;

    fn next(&mut self) -> Option<Self::Item> {
        if self.slice.is_empty() {
            return None;
        }
        let el = self.slice.get(0);
        self.slice = &self.slice[1..];
        el
    }
}

pub struct MyMutableIterator<'a, T> {
    slice: &'a mut [T],
}

impl<'a, T> Iterator for MyMutableIterator<'a, T> {
    type Item = &'a mut T;
    fn next(&mut self) -> Option<Self::Item> {
        let slice = &mut self.slice;
        let slice_copy = std::mem::replace(slice, &mut []);
        let (first, rest) = slice_copy.split_first_mut()?;
        self.slice = rest;
        Some(first)
    }
}

pub enum ListItem<T> {
    Value(T, Rc<ListItem<T>>),
    Nil,
}

#[allow(dead_code)]
pub struct Node<T> {
    value: T,
    next: Option<Box<Node<T>>>,
}

/// 解引用
impl<T> Deref for Node<T> {
    type Target = T;
    fn deref(&self) -> &T {
        &self.value
    }
}

#[cfg(test)]
mod tests {
    use crate::MyIteratorWrapper;
    use crate::Node;

    #[test]
    fn test_node() {
        let mut node1 = Node {
            value: 1,
            next: None,
        };
        let node2 = Node {
            value: 2,
            next: None,
        };
        node1.next = Some(Box::new(node2));
        assert_eq!(node1.value, 1);
    }

    #[test]
    fn it_works() {
        let collection = vec![1, 2, 3, 4, 5];
        let wrapper = MyIteratorWrapper {
            slice: &collection[..],
        };

        for (index, ele) in wrapper.enumerate() {
            assert_eq!(*ele, collection[index])
        }
    }
}
