export class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    // 私有属性
    this._rating = 0;
    // ES2020私有属性, 只能在类的内部访问
    this.#meta = 'Person.private';
  }

  get rating() {
    return this._rating;
  }

  set rating(value) {
    this._rating = value;
  }

  printRating() {
    console.log('Person.prototype.printRating', this._rating);
  }

  toString() {
    console.log('Person.prototype.toString', this);
    return `[name: ${this.name}, age: ${this.age}]`;
  }
}

// ============================================================
// ES6继承，不能继承私有属性，静态属性
export class Employee extends Person {
  constructor(name, age, salary) {
    super(name, age);
    this.salary = salary;
  }

  toString() {
    console.log('Employee.prototype.toString', this);
    return `[name: ${this.name}, age: ${this.age}, salary: ${this.salary}]`;
  }
}

(() => {
  const employee = new Employee('张三', 18, 1000);
  console.log(employee);
  console.log(employee.toString());
  employee.rating = 100;
  employee.printRating();
})();