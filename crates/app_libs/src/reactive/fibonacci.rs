#![allow(dead_code)]
pub struct Fibonacci {
    pub a: u64,
    pub b: u64,
    pub cur: u64,
    pub total: u64,
}

impl Fibonacci {
    pub fn new(size: u64) -> Self {
        Fibonacci {
            a: 1,
            b: 1,
            cur: 0,
            total: size,
        }
    }
}

impl Iterator for Fibonacci {
    type Item = u64;

    fn next(&mut self) -> Option<Self::Item> {
        if self.cur < self.total {
            let next = self.a + self.b;
            self.a = self.b;
            self.b = next;
            self.cur += 1;
            Some(next)
        } else {
            None
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn it_works() {
        let fb = Fibonacci::new(10);
        assert_eq!(fb.total, 10);
        for el in fb.into_iter() {
            println!("{}", el);
        }
    }
}
