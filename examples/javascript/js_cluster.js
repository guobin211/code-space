import cluster from 'node:cluster';
import os from 'node:os';
import http from 'node:http';

const CPUS = os.cpus().length;
const PORT = 4202;

// 利用多核心的CPU
(() => {
  if (cluster.isPrimary) {
    for (let i = 0; i < CPUS; i++) {
      cluster.fork();
    }
  } else {
    const app = http.createServer((req, res) => {
      res.writeHead(200);
      res.end('hello world!');
    });
    app.listen(PORT);
    console.log(`app start at : http://127.0.0.1:${PORT}`);
  }
})();
