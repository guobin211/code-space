use std::{env, path};

use actix_web::{HttpResponse, Responder};
use handlebars::Handlebars;
use serde::{Deserialize, Serialize};

use self::home::{Home, View};

mod home;

pub async fn home_page() -> impl Responder {
    let home = home::Home::new();
    let page_html = render_page(&home);
    HttpResponse::Ok().body(page_html)
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SSRProps {
    pub page_name: String,
    pub page_dom: String,
    pub page_style: String,
    pub page_script: String,
}

impl SSRProps {
    fn new(home: &Home) -> Self {
        Self {
            page_name: "home".to_string(),
            page_dom: home.render(),
            page_style: home.style.to_string(),
            page_script: home.script.to_string(),
        }
    }
}

pub fn render_page(page: &Home) -> String {
    let dirname = env::current_dir().unwrap();
    let template = path::Path::new(&dirname).join("src/home/template.hbs");

    let mut handlebars = Handlebars::new();
    handlebars
        .register_template_file("template", &template)
        .unwrap();

    let data = SSRProps::new(&page);
    let result = handlebars.render("template", &data).unwrap();
    result
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_render_page() {
        let home = home::Home::new();
        let page_html = render_page(&home);
        println!("{}", page_html);
    }
}
