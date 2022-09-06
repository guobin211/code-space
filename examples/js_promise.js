import { readFile } from 'fs';
import path from 'path';
import { promisify } from 'util';
import { fileURLToPath } from 'url';
import http from 'http';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const asyncReadFile = promisify(readFile);
const file = path.join(__dirname, './js_basic.js');
const { time, timeEnd } = console;

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

const fetch = (url) => {
  return new Promise((resolve, reject) => {
    http
      .get(url, (res) => {
        const { statusCode } = res;
        if (statusCode !== 200) {
          res.resume();
          reject(new Error(`请求失败。状态码: ${statusCode}`));
          return;
        }
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => {
          rawData += chunk;
        });
        res.on('end', () => {
          resolve(rawData);
        });
      })
      .on('error', (e) => {
        reject(new Error(`请求遇到问题: ${e.message}`));
      });
  });
};

async function fetchBaidu() {
  const res = await fetch('http://www.baidu.com').catch((err) => {
    console.log(err);
    return null;
  });
  if (res) {
    console.log(`res size is : ${res.length}`);
  }
}

const fetchBaiduPromise = () => {
  fetch('http://www.baidu.com')
    .then((res) => {
      console.log(`res size is : ${res.length}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Async Main Function
(async () => {
  const result = await fetchHtml();
  const result2 = await fetchHtmlPromise();
  console.log(result === result2 ? 'success' : 'fail');
  time('fetchBaiduPromise');
  fetchBaiduPromise();
  timeEnd('fetchBaiduPromise');
  time('fetchBaidu');
  fetchBaidu();
  timeEnd('fetchBaidu');
})();
