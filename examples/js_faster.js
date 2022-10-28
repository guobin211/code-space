// async main function
(async () => {
  const source = {
    name: 'source',
    date: '2022-10-21 16:00:00',
  };
  const target = {};
  copyAttr(source, target);
  const result1 = mergeObject(source, target);
  const result2 = mergeProps(source, target);
  console.log('target\n', target);
  console.log('result1\n', result1);
  console.log('result2\n', result2);
})();

/**
 * 复制对象的属性
 * @param {object} source
 * @param {object} target
 */
function copyAttr(source, target) {
  for (const key in source) {
    if (Object.hasOwn(source, key)) {
      target[key] = source[key];
    }
  }
}

function mergeObject(source1, source2) {
  return Object.assign({}, source1, source2);
}

function mergeProps(source1, source2) {
  return { ...source1, ...source2 };
}
