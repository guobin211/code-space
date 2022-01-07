function main() {
  let x = 1;
  let y;

  function add(x: number) {
    x += 1;
    return x;
  }

  y = add(x);

  console.log(`x : ${x}, y : ${y}`);
}

main();

