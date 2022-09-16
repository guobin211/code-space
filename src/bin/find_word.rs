use clap::Parser;
use std::{fs::File, io::Read};

/// The application arguments.
#[derive(Parser, Debug)]
#[clap(author, version, about, long_about = None)]
pub struct AppArgs {
    /// input file
    #[clap(short, long)]
    pub input: String,
    /// search text form input file
    #[clap(short, long, default_value = "name")]
    pub search: String,
}

/// 找出文件中出现word的次数
pub fn find_word(filename: &str, word: &str) {
    if word.is_empty() || filename.is_empty() {
        return;
    }
    let file_path = std::env::current_dir().unwrap().join(filename);
    match File::open(&file_path) {
        Ok(mut file) => {
            let mut contents = String::new();
            file.read_to_string(&mut contents).unwrap();
            let words = contents.split(" ");
            let mut count = 0;
            for w in words {
                if w == word {
                    count += 1;
                }
            }
            println!("find word: {}, count: {}", word, count);
        }
        Err(_) => println!("No such file: {:?}", &file_path),
    }
}

fn main() {
    let args = AppArgs::parse();
    find_word(&args.input, &args.search);
}
