use js_sys::{decode_uri_component, encode_uri_component, escape, unescape, JsString};

pub fn is_equal(m: f64, n: f64) -> bool {
    (m - n).abs() < f32::MAX as f64
}

pub fn float_add(m: f64, n: f64) -> f64 {
    m + n
}

pub fn safe_decode(encoded: &str) -> JsString {
    return match decode_uri_component(encoded) {
        Ok(decoded) => decoded,
        Err(_) => "".into(),
    };
}

pub fn safe_encode(encoded: &str) -> JsString {
    encode_uri_component(encoded)
}

pub fn safe_escape_str(input: &str) -> JsString {
    escape(input)
}

pub fn safe_unescape_str(input: &str) -> JsString {
    unescape(input)
}
