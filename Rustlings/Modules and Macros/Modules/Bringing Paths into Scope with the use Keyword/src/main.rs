use std::collections::HashMap;

fn main() {
    // put you code here to launch it
    let mut map = HashMap::new();
    let mut arr = Vec::new();
    arr.push(1);
    map.insert(1, arr);
    println!("map is {:?}", map);

    let v = map.get_mut(&1);
    println!("map[1] is {:?}", v);
    match v {
        Some(list) => {
            list.push(2);
            println!("list now is {:?}", list);
        }
        _ => {
            println!("not get &1 in map")
        }
    }
    println!("map is {:?}", map);
}
