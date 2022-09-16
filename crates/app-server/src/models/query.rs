use serde::{Deserialize, Serialize};
use url::Url;

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct PageQuery {
    pub page_index: u32,
    pub page_size: u32,
}

impl PageQuery {
    /// Create PageQuery from URL
    #[allow(dead_code)]
    pub fn from_url(url: &str) -> Self {
        let mut pq = PageQuery {
            page_index: 1,
            page_size: 10,
        };
        let parsed = Url::parse(url).unwrap();

        let page_index = parsed.query_pairs().find(|(key, _)| key == "page_index");
        if let Some(page_index) = page_index {
            let (_, page_index) = page_index;
            let page_index = page_index.parse::<u32>().unwrap_or(1);
            pq.page_index = page_index;
        }

        let page_size = parsed.query_pairs().find(|(key, _)| key == "page_size");
        if let Some(page_size) = page_size {
            let (_, page_size) = page_size;
            let page_size = page_size.parse::<u32>().unwrap_or(1);
            pq.page_size = page_size;
        }

        pq
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    pub fn test_from_url() {
        let url = "http://localhost:8080/api/v1/users?page_index=2&page_size=10";
        let query = PageQuery::from_url(url);
        println!("{:?}", query);
        assert_eq!(query.page_index, 2);
        assert_eq!(query.page_size, 10);
    }
}
