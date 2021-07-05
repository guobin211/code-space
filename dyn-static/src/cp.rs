use std::{
    io::{Read, Write},
    process::{Command, Stdio},
    sync::{Arc, Mutex},
};

#[allow(dead_code)]
pub fn run_child_process() {
    let output = Command::new("rustc")
        .arg("--version")
        .output()
        .unwrap_or_else(|e| panic!("failed to execute process: {}", e));

    if output.status.success() {
        let data = String::from_utf8_lossy(&output.stdout);
        println!("std success {:?}", data);
    } else {
        let error = String::from_utf8_lossy(&output.stderr);
        println!("std error {:?}", error);
    }
}

#[allow(dead_code)]
pub fn run_cp_with_pipe() {
    let cp = match Command::new("wc")
        .stdin(Stdio::piped())
        .stdout(Stdio::piped())
        .spawn()
    {
        Err(reason) => panic!("spawn error {:?}", reason),
        Ok(p) => p,
    };

    match cp.stdin.unwrap().write_all("1 + 1".as_bytes()) {
        Err(err) => panic!("error {}", err),
        Ok(_) => println!("send params to node"),
    }

    let mut s = String::new();
    match cp.stdout.unwrap().read_to_string(&mut s) {
        Err(err) => {
            println!("node run error with : {:?}", err)
        }
        Ok(res) => {
            println!("node res is {:?}", &res)
        }
    }
}

#[allow(dead_code)]
#[derive(Clone, Copy, Debug)]
struct State {
    count: u32,
}

#[allow(dead_code)]
async fn task1(state: &Arc<Mutex<State>>) -> u32 {
    if let Ok(mut state) = state.lock() {
        state.count += 1;
    }
    1
}

#[allow(dead_code)]
async fn task2(state: &Arc<Mutex<State>>) -> u32 {
    if let Ok(mut state) = state.lock() {
        state.count += 2;
    }
    2
}

#[allow(dead_code)]
pub async fn async_main() {
    let state = State { count: 0 };
    let data = Arc::new(Mutex::new(state));
    let (res1, res2) = futures::join!(task1(&data), task2(&data));
    println!("res1 : {}, res2 : {}", res1, res2);

    let state_res = *data.lock().unwrap();
    println!("state res is {:?}", state_res);
}

#[cfg(test)]
mod tests {
    use futures::executor::block_on;

    use super::*;

    #[test]
    fn test_async() {
        block_on(async_main());
    }
}
