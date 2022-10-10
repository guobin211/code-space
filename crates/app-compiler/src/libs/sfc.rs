use std::{
    fs::File,
    io::{BufRead, BufReader},
    path::Path,
};

pub fn sfc() {
    println!("sfc 单文件组件");
}

#[derive(Debug)]
pub struct SFC {
    pub file_name: String,
    pub file_path: String,
    pub template: String,
    pub style: String,
    pub script_js: String,
    pub script_rs: String,
}

#[derive(Debug)]
enum SourceType {
    Template,
    Style,
    ScriptJs,
    ScriptRs,
}

fn get_source_type(line: &str) -> SourceType {
    if line.contains("<template>") {
        SourceType::Template
    } else if line.contains("<style>") {
        SourceType::Style
    } else if line.contains("<script lang=\"js\">") || line.contains("<script lang=\"ts\">") {
        SourceType::ScriptJs
    } else if line.contains("<script lang=\"rust\">") {
        SourceType::ScriptRs
    } else {
        SourceType::Style
    }
}

fn is_end_block(line: &str) -> bool {
    line.contains("</template>") || line.contains("</style>") || line.contains("</script>")
}

impl SFC {
    /// 读取单文件组件
    pub fn from_file(file_path: &Path) -> Self {
        match File::open(file_path) {
            Ok(file) => {
                let file_name = file_path.file_name().unwrap().to_str().unwrap().to_string();
                let lines = BufReader::new(file).lines();
                let mut sfc = SFC {
                    file_name,
                    file_path: file_path.to_str().unwrap().to_string(),
                    template: String::new(),
                    style: String::new(),
                    script_js: String::new(),
                    script_rs: String::new(),
                };
                let mut source_type = SourceType::ScriptRs;
                let mut is_end = true;
                for line in lines {
                    if let Ok(data) = line {
                        if data.is_empty() {
                            continue;
                        }
                        if is_end {
                            source_type = get_source_type(&data);
                            is_end = false;
                            continue;
                        }
                        if is_end_block(&data) {
                            is_end = true;
                            continue;
                        }
                        match source_type {
                            SourceType::Template => {
                                sfc.template.push_str(&data);
                            }
                            SourceType::Style => {
                                sfc.style.push_str(&data);
                            }
                            SourceType::ScriptJs => {
                                sfc.script_js.push_str(&data);
                            }
                            SourceType::ScriptRs => {
                                sfc.script_rs.push_str(&data);
                            }
                        }
                    }
                }
                return sfc;
            }
            Err(err) => {
                panic!("open file error: {}", err);
            }
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_from_file() {
        let file = Path::new("/root/.admin/code-space/src/views/home.rsx");
        println!("{:?}", file);
        let sfc = SFC::from_file(&file);
        assert_eq!(sfc.file_name, "home.rsx");
        println!("script_js \n{}", sfc.script_js);
        println!("script_rs \n{}", sfc.script_rs);
        println!("style \n{}", sfc.style);
        println!("template \n{}", sfc.template);
    }
}
