use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Default)]
pub struct CustomHeader {
    token: Option<String>,
    authentication: Option<String>,
}
