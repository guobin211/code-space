use crate::observer::{Listener, Observer};

#[derive(Debug)]
pub struct Subject {
    pub pre_state: String,
    pub state: String,
    pub next_state: String,

    pub observers: Vec<Listener>,
}

impl Default for Subject {
    fn default() -> Self {
        Subject {
            pre_state: "".to_string(),
            state: "".to_string(),
            next_state: "".to_string(),
            observers: Vec::new(),
        }
    }
}

impl Observer for Subject {
    fn subscribe(&mut self, listener: Listener) {
        self.observers.push(listener);
    }

    fn unsubscribe(&mut self, id: &str) {
        self.observers.retain(|obs| obs.id == id)
    }

    fn publish(&mut self, data: &str) {
        for obs in self.observers.iter() {
            obs.on_message(data);
        }
    }

    fn clear(&mut self) {
        self.observers = Vec::new();
    }
}
