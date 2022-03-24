mod observer;
mod subject;

#[cfg(test)]
mod tests {
    use crate::observer::{Listener, Observer};
    use crate::subject::Subject;

    #[test]
    fn it_works() {
        let mut subject = Subject::default();
        let jack = Listener {
            id: "jack".to_string(),
        };
        let tom = Listener {
            id: "tom".to_string(),
        };

        let msg = "hello msg";
        subject.subscribe(jack);
        subject.subscribe(tom);

        subject.publish(&msg);

        subject.unsubscribe("tom");
        subject.publish("some data");

        subject.clear();
        subject.publish("clear data");

        println!("Subject {:?}", subject);
    }
}
