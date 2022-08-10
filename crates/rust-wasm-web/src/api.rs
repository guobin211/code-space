use crate::encoder::safe_encode;
use js_sys::*;
use wasm_bindgen::prelude::*;

// 浏览器平台全局函数
#[wasm_bindgen]
extern "C" {
    // 闭包函数
    fn takes_immutable_closure(f: &dyn Fn());

    fn takes_mutable_closure(f: &mut dyn FnMut());
    // 通过闭包函数与js交互
    // rust中调用js的函数
    // ```js
    //  window.takes_closure_parse_to_string = (fn) => {
    //    const result = fn(x);
    //    console.log(result);
    //  }
    // ```
    fn takes_closure_parse_to_string(x: &dyn Fn(String) -> String);
    // 在rust中使用浏览器API console.log
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn console_log(s: &str);
}

pub fn parse_number(params: &Number) -> JsString {
    safe_encode(&format!("?number={}", params))
}

pub fn parse_int(params: &BigInt) -> JsString {
    safe_encode(&format!("{}", params))
}

pub fn parse_str(params: &str) -> JsString {
    safe_encode(&params)
}

pub fn parse_string(params: String) -> JsString {
    safe_encode(&params)
}

pub fn parse_boolean(params: Boolean) -> JsString {
    if params == true {
        return safe_encode("true");
    }
    safe_encode("false")
}

pub fn parse_null(params: &JsValue) -> bool {
    JsValue::is_null(params)
}

pub fn parse_undefined(params: &JsValue) -> bool {
    JsValue::is_undefined(params)
}

pub fn parse_symbol(params: &Symbol) -> String {
    let mut result: String = "Not a Symbol".to_owned();
    if JsValue::is_symbol(&params) {
        result = format!("{:?}", params.to_string());
    }
    result
}

pub fn parse_object(params: &Object) -> Object {
    let result = Object::new();
    if JsValue::is_null(params) {
        return result;
    }
    result
}

pub fn parse_set(params: &Set) -> Box<[JsValue]> {
    let mut arr: Vec<JsValue> = Vec::new();
    params.for_each(&mut |el, _, _| {
        arr.push(el);
    });
    arr.into_boxed_slice()
}

pub fn reverse_map(params: &Map) -> Map {
    let result = Map::new();
    params.for_each(&mut |v, k| {
        if JsValue::is_string(&k) {
            if JsValue::is_string(&v) {
                result.set(&v, &k);
            }
        }
    });
    result.set(&JsString::from("rust"), &JsString::from("1.59"));
    result
}

// 数组过滤bigint
pub fn parse_bigint_array(params: Option<Box<[JsValue]>>) -> Box<[JsValue]> {
    let mut result: Vec<JsValue> = Vec::new();
    if let Some(arr) = params {
        for el in arr.iter() {
            if el.is_bigint() {
                result.push(el.clone());
            }
        }
    }
    result.into_boxed_slice()
}

// ArrayBuffer = [u8]
pub fn parse_array_buffer(params: &[u8]) -> usize {
    params.len()
}

pub fn call_js_method() {
    takes_immutable_closure(&|| {
        console_log("call_js_method in rust!");
    });
}

pub fn call_take_method(params: &str) {
    // 可变函数 利用闭包与rust交互
    takes_closure_parse_to_string(&|x| format!("{}={}&ticket=F08300", params, x));
}
