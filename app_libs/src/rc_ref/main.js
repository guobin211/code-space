function main() {
  const p = '中國人';
  for (let pElement of p) {
    console.log('str is ', pElement);
    console.log('charCode is ', pElement.charCodeAt(0));
    console.log('char is ', pElement.charAt(0));
  }
}

/**
 * getDate
 * @returns {Promise<Date>}
 */
async function getDate() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(new Date());
    }, 1000);
  });
}

async function fetchJson() {
  const json = await getDate();
  console.log(json);
}

main();
fetchJson();
