/**
 * new的简单实现
 * @returns {Person}
 */
export function make() {
  const constructor = Array.prototype.shift.call(arguments);
  if (typeof constructor !== 'function') {
    throw new Error('fn must be a function');
  }
  const obj = Object.create(constructor.prototype);
  const result = constructor.apply(obj, arguments);
  return typeof result === 'object' ? result : obj;
}

function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.toString = function () {
  console.log('Person.prototype.toString', this);
  return `[name: ${this.name}, age: ${this.age}]`;
};

function main() {
  const p = new Person('John', 30);
  console.log(p);
  console.log(p.toString());
  const p1 = make(Person, 'John', 30);
  console.log(p1);
  console.log(p1.toString());
}

main();
