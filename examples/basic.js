function log(params) {
  this.Deno.core.print(params);
}

log("hello deno")

async function getDate() {
  return new Promise(resolve => {
    resolve('call promise');
  });
}

getDate().then(log);
