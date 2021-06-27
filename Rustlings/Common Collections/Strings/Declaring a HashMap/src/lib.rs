use std::collections::HashMap;

pub fn fruit_basket() -> HashMap<String, u32> {
    let mut basket = HashMap::new(); // Declare your hash map here

    // Two bananas are already given to you :)
    basket.insert(String::from("banana"), 2);
    // Put more fruits in your basket here!
    basket.insert(String::from("apple"), 4);
    basket.insert(String::from("orin"), 3);
    basket
}
