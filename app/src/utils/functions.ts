// eslint-disable-next-line @typescript-eslint/ban-types
export function defer(fn: Function, delay = 300, ...args: never[]): void {
  setTimeout(() => {
    fn(...args);
  }, delay);
}

export function delay(delay = 300): Promise<number> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(1);
    }, delay);
  });
}
