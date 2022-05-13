use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Default)]
pub struct ApiResponse<T> {
    code: u16,
    data: Option<T>,
    msg: String,
}
