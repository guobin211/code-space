pub trait Observer {
    fn subscribe(&mut self, listener: Listener);
    fn unsubscribe(&mut self, id: &str);
    fn publish(&mut self, data: &str);
    fn clear(&mut self);
}

#[derive(Debug, Clone)]
pub struct Listener {
    pub id: String,
}

impl Default for Listener {
    fn default() -> Self {
        Listener { id: "".to_string() }
    }
}

impl Listener {
    pub fn on_message(&self, msg: &str) {
        println!("{}, on_message, {}", self.id, msg)
    }
}
