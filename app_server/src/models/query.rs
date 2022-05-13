pub struct QueryParams {}

pub struct PageQuery {
    pub page_index: u32,
    pub page_size: u32,
}

impl PageQuery {
    pub fn new() -> Self {
        PageQuery {
            page_index: 0,
            page_size: 10,
        }
    }
}
