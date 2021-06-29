mod sort_help;

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

/// 选择排序
#[allow(dead_code)]
fn selection_sort(arr: Vec<i32>) -> Vec<i32> {
    let mut res = Vec::new();
    let mut min_index: usize;
    for i in 0..arr.len() - 1 {
        min_index = i;
        for j in i + 1..arr.len() {
            if arr[j] < arr[min_index] {
                min_index = j;
            }
        }
        res.push(arr[min_index])
    }
    res
}

#[allow(dead_code)]
fn insert_sort(mut arr: Vec<i32>) -> Vec<i32> {
    for i in 1..arr.len() {
        let mut j = i;
        while j > 0 && arr[j - 1] > arr[j] {
            arr.swap(j - 1, j);
            j -= 1;
        }
    }
    arr
}

#[cfg(test)]
mod tests {

    use crate::sort_help::{get_rand_array, get_time, is_sorted};
    use crate::{bubble_sort, insert_sort, selection_sort};

    #[test]
    fn test_bubble_sort() {
        let arr = get_rand_array(10000, -10000, 10000);
        assert_eq!(is_sorted(&arr), false);
        let res = bubble_sort(arr.to_owned());
        assert_eq!(is_sorted(&res), true);
    }

    #[test]
    fn test_selection_sort() {
        let arr = get_rand_array(10000, -10000, 10000);
        assert_eq!(is_sorted(&arr), false);
        let start = get_time();
        let res = selection_sort(arr);
        let end = get_time();
        println!("time is {}", end - start);
        assert_eq!(is_sorted(&res), true);
    }

    #[test]
    fn test_insect_sort() {
        let arr = get_rand_array(10, -10000, 10000);
        let res = insert_sort(arr);
        assert_eq!(is_sorted(&res), true);
        println!("res is {:?}", res);
    }
}
