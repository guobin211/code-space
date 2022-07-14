function effect(key: string, value: any) {
  console.log('effect', key, value);
}
export function ref<T extends Record<string, any>>(v: T): T {
  const data: any = v;
  return new Proxy(v, {
    get: (_, prop: string) => {
      return data[prop];
    },
    set: (_, prop: string, value: any, receiver) => {
      data[prop] = value;
      receiver = data[prop];
      effect('ref.set', receiver);
      return true;
    },
    ownKeys: (target) => {
      return Object.keys(target);
    }
  });
}

const obj = ref({ a: 1, b: 2 });
obj.a = 2;
