use std::{env, process};

use code_space::{run, Config};

fn main() {
    let args: Vec<String> = env::args().collect();
    let config = Config::new(args).expect("parse arguments error");
    println!("config: {:?}", config);
    if let Err(err) = run(config) {
        println!("app error: {:?}", err);
        process::exit(1);
    }
}
