const INITIAL_CAPACITY: usize = 7;

pub struct LoopQueue<T> {
    head: usize,
    tail: usize,
    data: Vec<T>,
    capacity: usize,
}

#[allow(dead_code)]
impl<T> LoopQueue<T> {
    fn new() -> Self {
        LoopQueue {
            head: 0,
            tail: 0,
            data: Vec::new(),
            capacity: INITIAL_CAPACITY,
        }
    }

    fn en_queue(&mut self, value: T) -> bool {
        self.data.push(value);
        true
    }

    fn de_queue(&mut self) -> bool {
        self.data.pop();
        true
    }

    fn front(&self) -> Option<&T> {
        self.data.get(self.head)
    }

    fn rear(&self) -> Option<&T> {
        self.data.get(self.tail)
    }

    fn is_empty(&self) -> bool {
        self.data.len() == 0
    }

    fn is_full(&self) -> bool {
        self.data.len() == self.capacity
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_queue() {
        let mut my_queue: LoopQueue<i32> = LoopQueue::new();
        assert_eq!(my_queue.is_empty(), true);
        assert_eq!(my_queue.is_full(), false);
        my_queue.en_queue(10);
        if let Some(f) = my_queue.front() {
            assert_eq!(f, &10);
        }
    }
}
