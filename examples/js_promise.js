import { readFile } from 'fs';
import path from 'path';
import { promisify } from 'util';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const asyncReadFile = promisify(readFile);
const file = path.join(__dirname, './js_basic.js');

/**
 * async function
 * @returns {Promise<string>}
 * 只有Promise.reject才会返回错误信息
 */
async function fetchHtml() {
  return asyncReadFile(file)
    .then((res) => {
      return res.toString();
    })
    .catch(() => {
      return 'read file error';
    });
}

const fetchHtmlPromise = async () => {
  try {
    return await new Promise((resolve, reject) => {
      readFile(file, (err, res) => {
        if (err) {
          reject('read file error');
        } else {
          resolve(res.toString());
        }
      });
    });
  } catch {
    return 'read file error';
  }
};

// Async Main Function
(async () => {
  const result = await fetchHtml();
  const result2 = await fetchHtmlPromise();
  console.log(result === result2 ? 'success' : 'fail');
})();
