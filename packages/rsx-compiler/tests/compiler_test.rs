#[cfg(test)]
mod tests {
    use rsx_compiler::get_dirname;

    #[test]
    fn test_compile() {
        let result = get_dirname();
        println!("__dirname : {}", result);
        assert!(result.contains("rsx-compiler"));
    }
}
