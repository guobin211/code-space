import { fileURLToPath } from 'node:url';
import { Worker, isMainThread, parentPort, workerData } from 'node:worker_threads';
import fs from 'node:fs';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const WORKER_THREAD_COUNT = 10;
const WORKER_STATUS = {
  INIT: 'INIT',
  START: 'START',
  FINISH: 'FINISH',
};

const job = (dirname) => {
  if (fs.statSync(dirname).isDirectory()) {
    const list = fs.readdirSync(dirname);
    return findMaxFile(list, dirname);
  }
};

const findMaxFile = (list, dirname) => {
  const result = {
    file: '',
    size: 0,
  };
  list.forEach((item) => {
    const file = path.join(dirname, item);
    const stat = fs.statSync(file);
    if (stat.isFile() && stat.size > result.size) {
      result.size = stat.size;
      result.file = file;
    }
  });
  return result;
};

export class WorkerPoll {
  get workers() {
    return globalThis['WorkerPoll'];
  }

  constructor(size, file) {
    this.size = size;
    this.file = file;
  }

  async execute() {
    if (!this.workers) {
      globalThis['WorkerPoll'] = [];
      for (let i = 0; i < this.size; i++) {
        const wk = new Worker(this.file, { workerData: { id: i } });
        wk.on('message', async (message) => {
          if (message.type === WORKER_STATUS.FINISH) {
            console.log('execute FINISH');
            await wk.terminate();
          }
        });
        globalThis['WorkerPoll'].push(wk);
      }
    }
  }
}

async function initMainTask() {
  const wt = new WorkerPoll(WORKER_THREAD_COUNT, __filename);
  await wt.execute();
}

async function workHandle() {
  const workerId = workerData.id;
  const handleInComingMessage = (msg) => {
    switch (msg.type) {
      case WORKER_STATUS.INIT:
        break;
      case WORKER_STATUS.START:
        handleJob(msg.data);
        break;
      default:
        break;
    }
  };
  const handleJob = (jobData) => {
    const result = job(jobData);
    parentPort.postMessage({
      type: WORKER_STATUS.FINISH,
      data: result,
      id: workerId,
    });
  };
  parentPort.on('message', handleInComingMessage);
}

// main function
(() => {
  if (isMainThread) {
    initMainTask();
  } else {
    workHandle();
  }
})();
