function test() {
  test_number();
  test_string();
  test_prototype();
  test_index_of_string();
}

function test_index_of_string() {
  // utf-16
  const p = '中國人';
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
  const hello = 'hello world!' as any;
  const res = (hello as MyString).replaceByIndex(0, 'H');
  console.log('res : ', res);
  console.log('hello : ', hello);
}

function test_string() {
  const hello = 'hello world!';
  const res = hello
    .split('')
    .map((c, i) => (i === 0 ? 'H' : c))
    .join('');
  console.log('res : ', res);
  console.log('hello : ', hello);
  const hello_list = Array.from(hello);
  hello_list[0] = 'H';
  console.log('hello_list : ', hello_list.join(''));
}

function test_number() {
  const x = 1;
  let y: number;

  function add(x: number) {
    x += 1;
    setTimeout(() => {
      y = 1;
    }, 0);
    // console.log('x : ', x);
    return x;
  }

  y = add(x);
  // question x is ?, y is ?
  console.log(`x : ${x}, y : ${y}`);
}

test();
