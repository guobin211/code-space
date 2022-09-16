use deno_core::anyhow::Result;
use deno_core::error::AnyError;
use deno_core::op;
use deno_core::RuntimeOptions;
use deno_core::{Extension, JsRuntime};
use std::rc::Rc;

#[op]
pub async fn console_error(s: String) {
    print!("\x1b[0;31m{}\x1b[0m", s);
}

#[op]
pub async fn console_warn(s: String) {
    print!("\x1b[93;40m{}\x1b[0m", s);
}

#[op]
pub async fn console_ok(s: String) {
    print!("\x1b[0;32m{}\x1b[0m", s);
}
// 运行js文件
pub async fn run_js_file(filepath: &str) -> Result<(), AnyError> {
    let main_module = deno_core::resolve_path(filepath)?;
    // 扩展
    let extension = Extension::builder()
        .ops(vec![
            console_error::decl(),
            console_warn::decl(),
            console_ok::decl(),
        ])
        .build();
    let mut js_runtime = JsRuntime::new(RuntimeOptions {
        module_loader: Some(Rc::new(deno_core::FsModuleLoader)),
        extensions: vec![extension],
        ..Default::default()
    });
    let runtime_code = include_str!("./v8_runtime.js");
    js_runtime
        .execute_script("[deno::runtime.js]", runtime_code)
        .unwrap();

    let mod_id = js_runtime.load_main_module(&main_module, None).await?;
    let result = js_runtime.mod_evaluate(mod_id);
    js_runtime.run_event_loop(false).await?;
    result.await?
}

// 运行js代码
pub fn run_js_code(code: &str) {
    let option = RuntimeOptions::default();
    let mut js_runtime = JsRuntime::new(option);
    let result = js_runtime.execute_script("index", &code);
    match result {
        Ok(res) => {
            println!("\nrun script success");
            println!("{:?}", res);
        }
        Err(err) => {
            println!("\nrun script failed");
            println!("{:?}", err);
        }
    }
}

#[tokio::main]
async fn main() -> Result<()> {
    run_js_file("examples/v8_test.js").await?;
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_run_js_code() {
        let code = include_str!("./basic.js");
        run_js_code(code);
    }
}
