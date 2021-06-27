use std::collections::HashMap;

fn main() {
    // put you code here to launch it
    let teams = vec![String::from("Blue"), String::from("Yellow")];
    let initial_scores = vec![10, 50];

    let mut scores: HashMap<_, _> = teams.into_iter().zip(initial_scores.into_iter()).collect();

    println!("scores is {:?}", scores);

    scores.insert(String::from("Green"), 30);

    println!("scores is {:?}", scores);
}
