/* eslint-disable no-redeclare */
// ============================================================
// 变量申明
// var a = 1;
// let a = 2;
const a = 3;
// let a = 4;
const func = (params) => {
  console.log('call func with', params);
};
func(a);

// ============================================================
// 常见的数据类型
const basicObject = {
  a: 1,
  b: '2',
  c: true,
  d: null,
  e: undefined,
  g: [1, 2, 3],
  f: function () {
    console.log('f');
  },
  h: BigInt(Number.MAX_SAFE_INTEGER + 1),
  i: {
    name: 'object',
  },
  j: Symbol('j'),
  k: new Map(),
};

Object.entries(basicObject).forEach(([key, value]) => {
  console.log(`\n${key}:`);
  console.log(value);
  console.log(`类型: ${typeof value}`);
});

// ============================================================
// Map vs Object
const map = new Map();
const object = {};
let fn = (p) => {
  console.log('call fn with', p);
};
map.set('fn', fn);
object.fn = fn;
map.get('fn')('p');
object.fn('p');
fn = (p) => {
  console.log('call newFn with', p);
};
map.get('fn')('p');
object.fn('p');
console.log('map', map);
console.log('object', object);

// ============================================================
// WeakSet and WeakMap
const weakSet = new WeakSet();
class Person {
  /**
   * @param {string} name
   */
  constructor(name) {
    this.name = name;
    this.parent = null;
    this.children = null;
  }

  valueOf() {
    return this.name.length;
  }

  toString() {
    return this.name;
  }

  /**
   * for-of 遍历
   */
  [Symbol.iterator] = function* () {
    yield this.name;
    yield this.children;
  };

  get [Symbol.toStringTag]() {
    return 'Person';
  }
}
const jack = new Person('jack');
const rose = new Person('rose');
weakSet.add(jack);
weakSet.add(rose);
console.log('weakSet', weakSet.has({ name: 'jack' }));
const jack1 = new Person('jack');
console.log(jack === jack1);
console.log('jack is : ', jack);
console.log(jack + 1);

for (const value of jack) {
  console.log('value', value);
}
console.log('typeof : ', typeof jack);
console.log(Object.prototype.toString.call(jack));
