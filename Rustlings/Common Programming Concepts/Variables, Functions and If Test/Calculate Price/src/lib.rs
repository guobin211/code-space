pub fn calculateprice(total: u32)  -> u32 {
    return if total >= 20 {
        total
    } else {
        total / 2
    }
}
