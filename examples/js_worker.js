import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Worker, isMainThread } from 'node:worker_threads';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
/**
 * 简单的工作线程创建
 */
const testBasic = () => {
  const dataStr = 'Hello, world!';
  const dataList = [dataStr];
  const dataObj = {
    arr: dataList,
  };
  const buffer = Buffer.from(JSON.stringify(dataObj));
  const workerFile = path.join(__dirname, './js_worker_thread.js');
  // 创建一个工作线程
  const worker = new Worker(workerFile, { workerData: { buffer } });
  worker
    .once('message', (message) => {
      console.log(`主线程收到消息: ${message}`);
    })
    .postMessage('主线程发消息到子线程');
};

/**
 * 工作线程排序
 * 1. 创建一个工作线程
 * 2. 向工作线程发送数据
 * 3. 发送指令：排序
 * 4. 接收工作线程的排序结果
 */
const testJob = () => {
  const arr = generateArray();
  const workerFile = path.join(__dirname, './js_worker_thread.js');
  // 创建一个工作线程
  const worker = new Worker(workerFile, { workerData: { arr } });
  worker
    .on('message', (message) => {
      console.log('主线程收到消息');
      if (isSorted(message)) {
        console.log('排序成功');
      } else {
        console.log('排序失败');
      }
    })
    .postMessage('sort_array');
};

const generateArray = (len = 10000) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(parseInt(Math.random() * len, 10));
  }
  return arr;
};

const isSorted = (arr) => {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      return false;
    }
  }
  return true;
};

(async function main() {
  if (isMainThread) {
    console.log(`main thread id: ${process.pid}`);
    console.log(`main thread file: ${import.meta.url}`);
    // testBasic();
    testJob();
  } else {
    console.log('主线程不当做工作线程使用');
    console.log(testBasic);
    console.log(testJob);
  }
})();
