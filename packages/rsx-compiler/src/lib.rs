pub fn compile() {}

pub fn get_dirname() -> String {
    let __dirname = std::env::current_dir().expect("failed to get current directory");
    String::from(__dirname.to_str().unwrap())
}
