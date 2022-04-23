function main() {
  test_number();
  test_string();
  test_prototype();
  test_index_of_string();
}

function test_index_of_string() {
  // utf-16
  const p: string = "中國人";
  const c = p[0];
  console.log('c char is : ' + c.charCodeAt(0));
  console.log('中国人 size is ', p.length);
}

function test_prototype() {
  interface MyString extends String {
    replaceByIndex: (i: number, c: string) => string;
  }
  /**
   * change prototype
   */
  (String.prototype as MyString).replaceByIndex = function (i, c) {
    const str = this.split('');
    str[i] = c;
    return str.join('');
  };
  let hello: String = 'hello world!';
  let res = (hello as MyString).replaceByIndex(0, 'H');
  console.log('res : ', res);
  console.log('hello : ', hello);
}

function test_string() {
  let hello: String = 'hello world!';
  let res = hello
    .split('')
    .map((c, i) => (i === 0 ? 'H' : c))
    .join('');
  console.log('res : ', res);
  console.log('hello : ', hello);
  let hello_list = Array.from(hello);
  hello_list[0] = 'H';
  console.log('hello_list : ', hello_list.join(''));
}

function test_number() {
  let x = 1;
  let y: number;

  function add(x: number) {
    x += 1;
    // console.log('x : ', x);
    return x;
  }

  y = add(x);
  // question x is ?, y is ?
  console.log(`x : ${x}, y : ${y}`);
}

main();
