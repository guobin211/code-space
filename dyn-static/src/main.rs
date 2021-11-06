use crate::cp::{run_child_process, run_cp_with_pipe};

mod cp;
mod rc;

/// enum
pub enum Change {
    Delete(std::ops::Range<usize>),
    Replace(std::ops::Range<usize>, String),
}
/// data class
struct NoopSpellChecker;
/// interface
pub trait SpellChecker {
    fn check(&self, input: &str) -> Vec<Change>;
}

impl SpellChecker for NoopSpellChecker {
    fn check(&self, _input: &str) -> Vec<Change> {
        Vec::new()
    }
}

/// data class
struct AntiSpaceChecker;

/// fn and data class
impl SpellChecker for AntiSpaceChecker {
    fn check(&self, input: &str) -> Vec<Change> {
        input
            .match_indices(" ")
            .map(|(index, space)| Change::Delete(index..index + space.len()))
            .collect()
    }
}

pub fn apply_change(source: &mut String, _change: Change) {
    println!("source is {}", source);
}

pub fn spell_check<C: SpellChecker>(input: &str, checker: C) -> String {
    let mut res = input.to_owned();
    for change in checker.check(input) {
        apply_change(&mut res, change)
    }
    res
}

/// Box 在堆内存的引用 &dyn SpellChecker
pub fn spell_check_dyn(input: &str, checker: Box<dyn SpellChecker>) -> String {
    let mut res = input.to_owned();
    for change in checker.check(input) {
        apply_change(&mut res, change);
    }
    res
}

fn main() {
    let txt = "Hello World Rust Lang!";
    let res = spell_check(txt, NoopSpellChecker);
    println!("{}", res);
    let res = spell_check(txt, AntiSpaceChecker);
    println!("{}", res);
    run_child_process();
    run_cp_with_pipe();
}
