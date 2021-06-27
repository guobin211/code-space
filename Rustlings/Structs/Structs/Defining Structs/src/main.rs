fn main() {
    // put your code here to launch it
    let user = User {
        username: String::from("jack"),
        email: String::from("jack@gmail.com"),
        sign_in_count: 27017,
        active: false,
    };

    println!("user is {:?}", user);
}

#[derive(Debug)]
struct User {
    username: String,
    email: String,
    sign_in_count: u64,
    active: bool,
}
