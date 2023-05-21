// ============================================================
// Language: javascript
// Path: examples/js_func.mjs
// Keywords: function
/**
 * 声明命名函数
 * @param {*} p
 */
export function print(p) {
  console.log('print: ', p);
}

/**
 * 声明箭头函数，函数赋值给常量`printError`
 * @param {*} p
 */
export const printError = (p) => {
  console.error('printError: ', p);
};

// async
export async function printAsync() {
  console.log('printAsync');
}

// promise
export const printErrorAsync = () => {
  return new Promise((resolve) => {
    console.log('printErrorAsync');
    resolve();
  });
};

// async and await
export const printAwait = async () => {
  const result = await printErrorAsync().catch((err) => {
    return err;
  });
  return result;
};

/**
 * 匿名箭头函数
 * @param {*} p
 */
(p) => {
  console.error('printError: ', p);
};

/**
 * 自动执行的匿名函数
 * @param {*} p
 */
(function () {
  console.log('自动执行的匿名函数');
})();

/**
 * 自动执行的命名函数
 * @param {*} p
 */
(function name() {
  console.log('自动执行的命名函数', name.name);
})();

/**
 * 自动执行的async命名函数
 * @param {*} p
 */
(async function asyncName() {
  console.log('自动执行的async命名函数', asyncName.name);
})();

/**
 * 自动执行的匿名箭头函数
 * @param {*} p
 */
(() => {
  console.log('自动执行的匿名箭头函数');
})();

/**
 * 自动执行的async匿名箭头函数
 * @param {*} p
 */
(async () => {
  console.log('自动执行的async匿名箭头函数');
})();

// ============================================================
// 模拟ES6的类
function Body() {
  this.className = 'Body';
}

function Head() {
  this.className = 'Head';
}

Body.prototype.getClassName = function () {
  console.log(`[className: ${this.className}]`);
};

// 模拟ES6的继承
Head.prototype = new Body();

export { Body, Head };

// ES6实例化对象
const instance = {
  className: 'instance',
  getClassName() {
    console.log(`[className: ${this.className}]`);
  },
  arrowFn: () => {
    console.log('arrowFn类似static方法, 没有this指向');
  },
};

(() => {
  const head = new Head();
  head.getClassName();
  instance.getClassName();
})();

// ============================================================
// 动态函数
export const add = (a, b) => a + b;

/**
 * 动态生成函数
 * @returns Function
 */
export const getAddFn = () => {
  return new Function('a', 'b', 'return a + b');
};

(() => {
  const res1 = add(1, 2);
  const res2 = getAddFn()(1, 2);
  console.log('res1 = res2 ', res1 === res2);
})();
