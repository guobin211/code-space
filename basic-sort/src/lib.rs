#[allow(dead_code)]
fn bubble_sort(arr: Vec<i32>) -> Vec<i32> {
    let mut res = arr;
    for i in 0..res.len() {
        for j in i + 1..res.len() {
            if res[i] > res[j] {
                let temp = res[j];
                res[j] = res[i];
                res[i] = temp;
            }
        }
    }
    res
}

#[allow(dead_code)]
fn is_sorted(arr: &Vec<i32>) -> bool {
    for i in 0..arr.len() - 1 {
        if arr[i + 1] < arr[i] {
            return false;
        }
    }
    true
}

#[cfg(test)]
mod tests {
    use crate::{bubble_sort, is_sorted};

    #[test]
    fn it_works() {
        let arr = vec![1, 3, 4, 2];
        println!("arr {:?}", arr);
        assert_eq!(is_sorted(&arr), false);
        let res = bubble_sort(arr.to_owned());
        println!("res {:?}", res);
        assert_eq!(is_sorted(&res), true);
    }
}
