use std::sync::mpsc::channel;
use std::sync::mpsc::Sender;
use std::sync::Arc;
use std::sync::Mutex;

pub struct ThreadPool {
    _handles: Vec<std::thread::JoinHandle<()>>,
    sender: Sender<Box<dyn Fn() + Send>>,
}

impl ThreadPool {
    pub fn new(num_threads: u8) -> Self {
        let (sender, receiver) = channel::<Box<dyn Fn() + Send>>();
        let receiver = Arc::new(Mutex::new(receiver));
        let mut _handles = vec![];
        for _id in 0..num_threads {
            let clone = receiver.clone();
            let handle = std::thread::spawn(move || loop {
                match clone.lock().unwrap().recv() {
                    Ok(work) => {
                        work();
                    }
                    Err(_) => {}
                }
            });
            _handles.push(handle);
        }
        Self { _handles, sender }
    }

    pub fn execute<T: Fn() + Send + 'static>(&self, work: T) {
        self.sender.send(Box::new(work)).unwrap();
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
        println!("form main thread");
        let pool = ThreadPool::new(10);
        let foo = || println!("hello from test thread");
        pool.execute(foo);
        println!("end of main thread");
    }
}
