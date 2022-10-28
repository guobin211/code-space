use regex::Regex;

fn main() {
    let text = r#" <script lang="rust">
    println!("hello world");
    </script>"#;

    let regex = Regex::new(r#"<script lang="rust">(\n*)(.*)(\n*)(.*)</script>"#).unwrap();

    let result = regex.find(text).unwrap().as_str();

    let code = result.replace("<script lang=\"rust\">", "").replace("</script>", "");
    println!("code : {}", code);
}
