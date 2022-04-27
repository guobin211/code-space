(() => {
  const source = 'Hello, World!';
  const result = source.toString();
  const obj1 = String(source);
  // noinspection JSPrimitiveTypeWrapperUsage
  const obj2 = new String(source);

  console.log(source === result);
  console.log(source === obj2);
  console.log(result === obj1);
  console.log(obj1 === obj2);

  const data = {
    toString() {
      return 'Hello, World!';
    },
    valueOf() {
      return 'Hello, World!';
    }
  }
  console.log(data === source);
})()
