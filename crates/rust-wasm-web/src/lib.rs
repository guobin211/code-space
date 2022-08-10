use wasm_bindgen::prelude::wasm_bindgen;

#[macro_use]
extern crate lazy_static;

pub mod adapter;
pub mod api;
pub mod encoder;
pub mod image;

#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

// 全局常量
lazy_static! {
    static ref CALL_COUNT: u32 = 100;
}

#[wasm_bindgen]
pub fn parse_str(params: &str) -> String {
    params.to_string()
}

#[cfg(test)]
mod tests {

    #[test]
    fn test_rust_wasm_web() {
        assert_eq!(1 + 1, 2)
    }
}
