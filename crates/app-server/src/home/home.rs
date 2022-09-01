use std::{
    env, fs,
    path::{self, PathBuf},
};

use handlebars::Handlebars;
use serde::{Deserialize, Serialize};

pub trait View {
    fn render(&self) -> String;
    fn render_with_props(&self, props: &HomeProps) -> String;
}

#[derive(Debug, Serialize, Deserialize)]
pub struct HomeProps {
    pub url: String,
    pub ua: String,
}
#[derive(Debug)]
pub struct Home {
    pub name: String,
    pub template: PathBuf,
    pub script: String,
    pub style: String,
}

impl Home {
    pub fn new() -> Home {
        let dirname = env::current_dir().unwrap();
        println!("dirname {:?}", dirname);
        let template = path::Path::new(&dirname).join("src/home/home.hbs");
        let style = path::Path::new(&dirname).join("src/home/home.css");
        let script = path::Path::new(&dirname).join("src/home/home.js");
        let script = fs::read_to_string(script).expect("read home.js failed");
        let style = fs::read_to_string(style).expect("read home.css failed");

        Home {
            name: "home".to_string(),
            template,
            script,
            style,
        }
    }
}

impl View for Home {
    fn render(&self) -> String {
        let mut handlebars = Handlebars::new();
        handlebars
            .register_template_file("home", &self.template)
            .expect("Failed to register template");
        let data = HomeProps {
                url: "http://localhost:8080".to_string(),
                ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 Chrome/81.0.4044.138 Safari/537.36".to_string(),
            };

        let result = handlebars.render("home", &data).unwrap();
        result
    }

    fn render_with_props(&self, props: &HomeProps) -> String {
        let mut handlebars = Handlebars::new();
        handlebars
            .register_template_file("home", &self.template)
            .expect("Failed to register template");
        let result = handlebars.render("home", &props).unwrap();
        result
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_home_render() {
        let home = Home::new();
        println!("{}", home.render());
    }
}
