pub fn arr() -> &'static str {
    let a = "this is a string";

    return if a.len() < 100 {
        "Wow, that's a big array!"
    } else {
        "Meh, I eat arrays like that for breakfast."
    }
}
