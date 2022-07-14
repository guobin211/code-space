use serde::{Serialize, Deserialize};

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct PageQuery {
    pub page_index: u32,
    pub page_size: u32,
}

impl PageQuery {
    /// Create PageQuery from URL
    #[allow(dead_code)]
    pub fn from_url(url: &str) -> Self {
        let res = url.split('=');
        println!("{:?}", res);
        PageQuery {
            page_index: 0,
            page_size: 10,
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    pub fn test_from_url() {
        let url = "http://localhost:8080/api/v1/users?page_index=1&page_size=10";
        let query = PageQuery::from_url(url);
        println!("{:?}", query);
    }
}
