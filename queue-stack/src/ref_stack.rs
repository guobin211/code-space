#[derive(Debug)]
pub struct Stack<T> {
    top: Option<Box<Node<T>>>,
}

#[derive(Debug, Clone)]
struct Node<T> {
    value: T,
    next: Option<Box<Node<T>>>,
}

#[allow(dead_code)]
impl<T> Stack<T> {
    fn new() -> Stack<T> {
        Stack { top: None }
    }

    fn push(&mut self, value: T) {
        let mut node = Node {
            value,
            next: None,
        };
        let next = self.top.take();
        node.next = next;
        self.top = Some(Box::new(node));
    }

    fn pop(&mut self) -> Option<T> {
        let unknown = self.top.take();
        match unknown {
            Some(mut data) => {
                self.top = data.next.take();
                Some(data.value)
            }
            None => None,
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_stack() {
        let mut stack: Stack<i32> = Stack::new();
        stack.push(1);
        stack.push(2);
        stack.push(3);

        println!("stack is {:?}", stack);

        if let Some(value) = stack.pop() {
            assert_eq!(value, 3);
        };
    }
}
