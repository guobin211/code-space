use serde_json::{json, Value};

pub struct StaticProps {
    pub props: Value,
}

pub struct RuntimeContext {
    pub req: Value,
}

pub fn get_static_props() -> Result<StaticProps, ()> {
    Ok(StaticProps {
        props: json!({
            "message": "Hello Rust.js"
        }),
    })
}

pub fn get_props_from_context(ctx: &RuntimeContext) -> Result<StaticProps, ()> {
    let id = ctx.req["query"]["id"].as_str().unwrap();
    Ok(StaticProps {
        props: json!({ "id": id }),
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_get_static_props() {
        let res = get_static_props();
        assert!(res.is_ok());
    }

    #[test]
    fn test_get_props_from_context() {
        let res = get_props_from_context(&RuntimeContext {
            req: json!({
              "query": {
                "id": "1"
              }
            }),
        });
        assert!(res.is_ok());
    }
}
