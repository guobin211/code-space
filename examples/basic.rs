use deno_core::anyhow::Result;
use deno_core::JsRuntime;
use deno_core::RuntimeOptions;

/**
Deno core Re-exports
pub use anyhow;
pub use futures;
pub use parking_lot;
pub use serde;
pub use serde_json;
pub use serde_v8;
pub use sourcemap;
pub use url;
pub use v8;
 */
#[tokio::main]
async fn main() -> Result<()> {
    let option = RuntimeOptions::default();
    let mut runtime = JsRuntime::new(option);
    let code = include_str!("./basic.js");
    let result = runtime.execute_script("basic", code);
    match result {
        Ok(res) => {
            println!("\nexecute_script result {:?}", res);
        }
        Err(err) => {
            println!("\nexecute_script error : {:?}", err);
        }
    }
    Ok(())
}
