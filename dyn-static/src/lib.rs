pub struct MyIterWrapper<'a, T> {
    slice: &'a [T],
}

impl<'a, T> Iterator for MyIterWrapper<'a, T> {
    type Item = &'a T;

    fn next(&mut self) -> Option<Self::Item> {
        if self.slice.is_empty() {
            return None;
        }
        let el = self.slice.get(0);
        self.slice = &self.slice[1..];
        el
    }

    // fn next(&mut self) -> Option<Self::Item> {
    //     let (ele, rest) = self.slice.split_first();
    //     self.slice = rest;
    //     Some(ele)
    // }
}

pub struct MyMutableIterator<'iter, T> {
    slice: &'iter mut [T],
}

impl<'iter, T> Iterator for MyMutableIterator<'iter, T> {
    type Item = &'iter mut T;
    fn next<'next>(&'next mut self) -> Option<Self::Item> {
        let slice = &mut self.slice;
        let slice_copy = std::mem::replace(slice, &mut []);
        let (first, rest) = slice_copy.split_first_mut()?;
        self.slice = rest;
        Some(first)
    }
}


#[cfg(test)]
mod tests {
    use crate::MyIterWrapper;


    #[test]
    fn it_works() {
        let collection = vec![1, 2, 3, 4, 5];
        let wrapper = MyIterWrapper {
            slice: &collection[..],
        };

        for (index, ele) in wrapper.enumerate() {
            assert_eq!(*ele, collection[index])
        }
    }
}