use std::{sync::mpsc, thread};

pub fn basic_thread() {
    let mut arr = vec![1, 2, 3];
    // 类似全局变量
    static mut ARR_SUM: i32 = 0;

    let copy_value = arr.clone();
    std::thread::spawn(move || {
        println!("thread started");
        unsafe {
            for i in copy_value {
                ARR_SUM = ARR_SUM + i;
            }
        }
    })
    .join()
    .unwrap();

    arr.push(4);
    dbg!(arr);
    unsafe {
        println!("res is : {}", ARR_SUM);
    }
}

///
/// 通道是一种在多个线程间传递消息的方式
///
/// 使用两个线程计算数组之和
///
pub fn sum_of_arr(arr: Vec<i32>) -> i32 {
    let mid: usize = arr.len() / 2;
    if mid < 4 {
        return arr.iter().sum();
    }
    let (tx, rx) = mpsc::channel::<i32>();
    let arr1 = arr.clone();
    let tx1 = tx.clone();
    let t1 = thread::spawn(move || {
        let mut sum = 0;
        let mut index = 0;
        while index < mid {
            sum += arr[index];
            index += 1;
        }
        tx.send(sum).unwrap();
    });
    let t2 = thread::spawn(move || {
        let mut sum = 0;
        let mut index = mid;
        while index < arr1.len() {
            sum += arr1[index];
            index += 1;
        }
        tx1.send(sum).unwrap();
    });
    t1.join().unwrap();
    t2.join().unwrap();
    let r1 = rx.recv().unwrap();
    let r2 = rx.recv().unwrap();
    println!("线程r1 : {} ", r1);
    println!("线程r2 : {} ", r2);
    r1 + r2
}

pub fn thread_local() {
    let mut arr = vec![1, 2, 3];
    let mut sum = 0;
    thread::scope(|st| {
        st.spawn(|| {
            println!("Thread");
            dbg!(&arr);
        });
        st.spawn(|| {
            sum = arr[0] + arr[1];
        });
    });
    arr.push(4);
    println!("res is : {}", sum);
}

fn main() {
    // basic_thread();
    let arr = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    sum_of_arr(arr);
    // sum_of_arr(vec![1]);
    thread_local();
}
