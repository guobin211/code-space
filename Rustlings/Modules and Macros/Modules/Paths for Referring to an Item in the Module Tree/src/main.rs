fn main() {
    // put you code here to launch it
}

#[allow(dead_code)]
mod front_of_house {
    #[allow(dead_code)]
    pub struct Host {
        ipv: String,
        proto: String,
    }
    #[allow(dead_code)]
    pub struct HostMap {
        key: String,
        value: Vec<Host>,
    }
    #[allow(dead_code)]
    pub mod hosting {
        use crate::front_of_house::{Host, HostMap};
        #[allow(dead_code)]
        fn add_to_wait_list(host: Host, mut host_map: HostMap) {
            host_map.value.push(host);
        }
    }
}
