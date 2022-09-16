use crate::database::user_doc::UserDoc;

/// User authentication middleware
#[allow(dead_code)]
pub fn authorization(u: &UserDoc, t: &str) -> bool {
    let v = get_authorization(u);
    t == v
}

/// get authorization token from user doc
pub fn get_authorization(u: &UserDoc) -> String {
    format!("{}", u.username)
}
