import { parentPort, isMainThread, workerData } from 'worker_threads';
import { StringDecoder } from 'string_decoder';

const JOB_NAME = 'sort_array';

/**
 * 创建buffer
 * @param {*} obj
 * @returns Buffer
 */
const encodeMessage = (obj) => {
  if (!obj || typeof obj !== 'object') {
    return null;
  }
  try {
    return Buffer.from(JSON.stringify(obj));
  } catch (error) {
    return null;
  }
};

/**
 * 解析buffer
 * @param {Buffer} buffer
 * @returns {string}
 */
const decodeMessage = (buffer) => {
  if (!buffer) {
    return null;
  }
  try {
    const decoder = new StringDecoder('utf8');
    return decoder.write(buffer);
  } catch (error) {
    return null;
  }
};

const sortArrayJob = (arr) => {
  return arr.sort((a, b) => a - b);
};

const test = () => {
  const data = {
    name: 'test',
    age: 18,
    list: [1, 2, 3],
  };
  const buffer = encodeMessage(data);
  const result = decodeMessage(buffer);
  console.log(result);
};

// ===========================================================================
// 工作线程的时序不确定
if (isMainThread) {
  console.log('工作线程不能直接执行主线程代码');
  test();
} else {
  console.log(`worker thread id: ${process.pid}`);
  console.log(`worker thread file: ${import.meta.url}`);
  console.log(`worker thread data: ${workerData}`);
  parentPort
    .once('message', (message) => {
      console.log(`工作线程收到消息: ${message}`);
      if (message === JOB_NAME) {
        const sorted = sortArrayJob(workerData.arr);
        console.log('工作线程排序完成');
        parentPort.postMessage(sorted);
      } else {
        const str = decodeMessage(workerData.buffer);
        console.log(str);
      }
    })
    .postMessage('工作线程启动成功');
}
