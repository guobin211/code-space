use core::cell::RefCell;
use std::rc::Rc;
use std::{env, process};

use code_space::{run, Config};

fn main() {
    let leaf = Rc::new(RefCell::new(1));
    println!(
        "leaf strong = {}, weak = {}",
        Rc::strong_count(&leaf),
        Rc::weak_count(&leaf)
    );
    let other = &leaf;

    println!(
        "leaf strong = {}, weak = {}",
        Rc::strong_count(&leaf),
        Rc::weak_count(&leaf)
    );
    // Rc ref vs RefCell
    println!("other strong = {}", other.borrow());
    let args: Vec<String> = env::args().collect();
    let config = Config::new(args).expect("parse arguments error");
    println!("config: {:?}", config);
    if let Err(err) = run(config) {
        println!("app error: {:?}", err);
        process::exit(1);
    }

    println!("this is main fn {}", String::from("main"));
}
