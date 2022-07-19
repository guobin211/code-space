#![allow(dead_code)]

use std::ops::Add;
#[derive(Debug)]
pub struct Square {
    pub x: u64,
    pub y: u64,
    pub size: u64,
}

#[derive(Debug)]
pub struct Rectangle {
    pub x: u64,
    pub y: u64,
    pub width: u64,
    pub height: u64,
}

impl Add for Square {
    type Output = Square;

    fn add(self, other: Self) -> Self::Output {
        Square {
            x: if self.x < other.x { self.x } else { other.x },
            y: if self.y < other.y { self.y } else { other.y },
            size: if self.size > other.size {
                self.size
            } else {
                other.size
            },
        }
    }
}

pub fn add(a: Square, b: Rectangle) -> Rectangle {
    Rectangle {
        x: if a.x < b.x { a.x } else { b.x },
        y: if a.y < b.y { a.y } else { b.y },
        width: if a.size > b.width { a.size } else { b.width },
        height: if a.size > b.height { a.size } else { b.height },
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn it_works() {
        let s1 = Square {
            x: 0,
            y: 0,
            size: 10,
        };
        let s2 = Rectangle {
            x: 0,
            y: 0,
            width: 20,
            height: 20,
        };
        let s3 = add(s1, s2);
        assert_eq!(s3.width, 20);
    }
}
