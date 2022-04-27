class Person {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

class Man extends Person {
  constructor() {
    super();
    this.name = 'jack'
    this.age = 22
  }
}

const map = new Man()

for (const key in map) {
  if (Object.hasOwnProperty.call(map, key)) {
    const element = map[key];
    console.log(`${key}: ${element}`);
  }
  const element = map[key];
  console.log(`${key}: ${element}`);
}
