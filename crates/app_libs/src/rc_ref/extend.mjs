class Person {
  constructor(name) {
    this.name = name;
  }
}
/**
 * prototype上的属性不会被forin迭代
 * @returns {string}
 */
Person.prototype.getName = function () {
  return this.name;
}
class Man extends Person {
  constructor(name) {
    super(name);
    this.name = name
    this.age = 22
  }
}

const jack = new Person('jack')
console.log('Person =============== ');
for (const key in jack) {
  const element = jack[key];
  if (Object.hasOwnProperty.call(jack, key)) {
    console.log(`hasOwnProperty = ${key}: ${element}`);
  } else {
    console.log(`${key}: ${element}`);
  }
}

const tom = new Man('tom')
console.log('Man================== ');
for (const key in tom) {
  const element = tom[key];
  if (Object.hasOwnProperty.call(tom, key)) {
    console.log(`${key}: ${element}`);
  }
}
