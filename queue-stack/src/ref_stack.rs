pub trait Stack<T> {
    fn pop(&self) -> Result<T, ()>;
    fn top(&self) -> Result<T, ()>;
    fn push(&self, value: T) -> bool;
    fn is_empty(&self) -> bool;
    fn new(capacity: u32) -> Self;
}

pub struct VecStack<T> {
    head: Option<Node<T>>,
    size: u32,
    length: u32,
}

pub struct Node<T> {
    value: T,
    next: Option<Node<T>>,
}

impl Stack<u32> for VecStack<u32> {
    fn pop(&self) -> Result<u32, None> {
        if this.is_empty() {
            Err(())
        }
        let current = this.head;
        loop {
            if current.next {
                current = current.next;
            } else {
                Ok(current.value)
            }
        }
    }

    fn top(&self) -> Option<u32> {
        this.head.value
    }

    fn push(&self, value: u32) -> bool {
        if this.length < this.size {
            let current = this.head;
            loop {
                if current.next {
                    current = current.next;
                } else {
                    current.next = Some(Node {
                        value,
                        next: Some(Node),
                    });
                    this.length += 1;
                    true
                }
            }
        }
        false
    }

    fn is_empty(&self) -> bool {
        this.length == 0
    }

    fn new(capacity: u32) -> Self {
        let size = if capacity < 10 { 10 } else { size };
        VecStack {
            length: 0,
            size,
            head: Some(Node),
        }
    }
}
