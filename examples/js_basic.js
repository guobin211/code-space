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
