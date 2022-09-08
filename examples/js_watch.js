/**
 * 监听属性变化
 * @param {object} source
 * @param {function} effect
 * @returns
 */
export function watch(source = {}, effect) {
  if (!source || typeof source !== 'object' || typeof effect !== 'function') {
    throw new Error('source must be object, effect must be function');
  }
  if ('__effect__' in source) {
    source['__effect__'].push(effect);
    return;
  } else {
    source['__effect__'] = [effect];
  }
  Object.keys(source).forEach((key) => {
    let value = source[key];
    Object.defineProperty(source, key, {
      get() {
        return value;
      },
      set(v) {
        if (value !== v) {
          const old = value;
          value = v;
          source['__effect__'].forEach((call) => call(old, value));
        }
      },
    });
  });
}

/**
 * Proxy
 * @param {object} source
 * @param {function} effect
 * @returns
 */
export function reactive(source = {}, effect) {
  if (!source || typeof source !== 'object' || typeof effect !== 'function') {
    throw new Error('source must be object, effect must be function');
  }
  if ('__effect__' in source) {
    return;
  } else {
    source['__effect__'] = effect;
  }
  return new Proxy(source, {
    get(target, p) {
      return target[p];
    },
    set(target, p, newValue) {
      if (target[p] !== newValue) {
        target[p] = newValue;
        source['__effect__']();
      }
      return target;
    },
  });
}

// Async Main Function
(async () => {
  const data = {
    name: 'jack',
    age: 22,
  };
  watch(data, (prev, curr) => {
    console.log(`change data prev : ${prev}, curr : ${curr}`);
  });
  watch(data, (prev, curr) => {
    console.log(`change data prev : ${prev}, curr : ${curr}`);
  });
  data.age = 19;
  data.age = 19;

  const person = {
    name: 'mary',
    age: 23,
  };
  const personRef = reactive(person, () => {
    console.log('person', person);
    console.log('personRef', personRef);
  });
  console.log('before change');
  console.log(person);
  console.log(personRef);
  personRef.age = 22;
  console.log('after change');
  console.log(person);
  console.log(personRef);
})();
