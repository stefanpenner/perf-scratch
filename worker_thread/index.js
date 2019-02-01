/*
 *  node-set v11                                                                                                                             (573ms)
 *   ✓ node.current = v11.9.0
 *  s/s/perf-scratch/worker_thread ╍{} node index.js
 * main: babel-core: 194.280ms
 * thread: babel-core: 224.869ms
 * thread: babel-core: 223.196ms
 * thread: babel-core: 222.100ms
 */
const {
  Worker, isMainThread, parentPort, workerData
} = require('worker_threads');

if (isMainThread) {
  console.time('main: babel-core');
  require('babel-core');
  console.timeEnd('main: babel-core');
  for (let i = 0; i < 10; i++) {
    new Worker(__filename, {
      workerData: __filename
    });
  }
} else {
  console.time('thread: babel-core');
  require('babel-core');
  console.timeEnd('thread: babel-core');
setInterval(() => require('babel-core'), 100)
}


setInterval(() => require('babel-core'), 100)
