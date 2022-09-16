use oxipng::{optimize_from_memory, Options};
pub fn compress_image(image_data: &[u8]) -> Vec<u8> {
    let options = Options {
        ..Options::default()
    };
    match optimize_from_memory(image_data, &options) {
        Ok(result) => result,
        Err(e) => {
            panic!("Error: {}", e);
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_compress_image() {
        let current_dir = std::env::current_dir().unwrap();
        println!("{:?}", current_dir);
        let file_path = current_dir.join("src/test.png");
        let file = std::fs::read(file_path).unwrap();
        let result = compress_image(&file);
        let percentage = (result.len() as f32 / file.len() as f32) * 100.0;
        println!("result size {}%", percentage);
    }
}
