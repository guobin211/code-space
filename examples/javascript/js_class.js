export class Person {
  // 私有属性
  #meta;
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
    this.#log();
  }

  printRating() {
    console.log('Person.prototype.printRating', this._rating);
  }

  toString() {
    console.log('Person.prototype.toString', this);
    return `[name: ${this.name}, age: ${this.age}]`;
  }

  // 私有方法
  #log() {
    console.log('Person.private.log', this.rating);
  }

  static create(name, age) {
    return new Person(name, age);
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

export function Animal(name) {
  if (!new.target) {
    throw new Error('Animal must be called with new');
  }
  this.name = name;
}

/**
 * static method
 * @param {object} someAnimal
 * @returns boolean
 */
Animal.printIsSafe = function (someAnimal) {
  if (someAnimal && typeof someAnimal.printName === 'function') {
    return true;
  }
  return false;
};

Animal.prototype.printName = function () {
  console.log('Animal.prototype.printName : ', this.name);
};

function getDate() {
  if (new.target) {
    throw new Error('getDate() can not be called with new');
  }
  return new Date().toLocaleString();
}

(() => {
  const employee = new Employee('张三', 18, 1000);
  console.log(employee);
  console.log(employee.toString());
  employee.rating = 100;
  employee.printRating();
  console.log('getDate() : ', getDate());
  new Animal('dog').printName();
})();
