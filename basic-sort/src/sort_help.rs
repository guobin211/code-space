use chrono::prelude::Local;
use rand::Rng;

extern crate chrono;

#[allow(dead_code)]
pub fn get_time() -> i64 {
    let dt = Local::now();
    dt.timestamp_millis()
}

/// get random array by length
#[allow(dead_code)]
pub fn get_rand_array(len: u32, min: i32, max: i32) -> Vec<i32> {
    if min >= max {
        panic!("min must < max");
    }
    let mut rng = rand::thread_rng();
    let mut res = Vec::new();
    for _ in 0..len {
        let num = rng.gen_range(min..max);
        res.push(num);
    }
    res
}

/// is_sorted 判断是否是排序的数组
#[allow(dead_code)]
pub fn is_sorted(arr: &Vec<i32>) -> bool {
    for i in 0..arr.len() - 1 {
        if arr[i + 1] < arr[i] {
            return false;
        }
    }
    true
}

#[cfg(test)]
mod tests {
    use crate::sort_help::get_rand_array;
    use crate::sort_help::get_time;
    use crate::sort_help::is_sorted;

    #[test]
    fn it_works() {
        let arr = get_rand_array(100, -100, 100);
        assert_eq!(arr.len(), 100);
        assert_eq!(is_sorted(&arr), false);
        assert_eq!(is_sorted(&vec![1, 2, 3, 4, 4]), true);
        let timestamp = get_time();
        println!("timestamp is  {}", timestamp);
    }
}
