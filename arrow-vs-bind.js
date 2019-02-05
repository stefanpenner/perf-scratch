/*
node-set v6                                                                                                            (1)
  ✓ node.current = v6.9.5
 s/s/perf-scratch ╍{} node arrow-vs-bind.js
testing
- => create
- bind create
- => invoke
- bind invoke
running first test, please wait...
  => create ..... 58,500,202.55 op/s
  bind create .... 3,418,019.46 op/s
  => invoke ...... 4,147,073.20 op/s
  bind invoke .... 4,054,436.66 op/s


 node-set v8                                                                                                    (25s 400ms)
  ✓ node.current = v8.9.4
 s/s/perf-scratch ╍{} node arrow-vs-bind.js
testing
- => create
- bind create
- => invoke
- bind invoke
running first test, please wait...
  => create .... 138,720,515.86 op/s
  bind create ... 39,099,221.19 op/s
  => invoke ..... 38,548,328.55 op/s
  bind invoke ... 38,576,024.81 op/s

 node-set v10                                                                                                   (25s 952ms)
  ✓ node.current = v10.9.0
 s/s/perf-scratch ╍{} node arrow-vs-bind.js
testing
- => create
- bind create
- => invoke
- bind invoke
running first test, please wait...
  => create .... 803,016,854.50 op/s // TODO: take some time to understand this high number properly
  bind create .. 796,167,034.64 op/s // TODO: take some time to understand this high number properly
  => invoke .... 170,845,622.76 op/s
  bind invoke .. 171,020,153.52 op/s
 s/s/perf-scratch ╍{}

 node-set v11                                                                                                   (25s 312ms)
  ✓ node.current = v11.9.0

 node arrow-vs-bind.js                                                                                          (25s 372ms)
testing
- => create
- bind create
- => invoke
- bind invoke
running first test, please wait...
  => create .... 830,380,244.78 op/s // TODO: take some time to understand this high number properly
  bind create .. 814,340,020.61 op/s // TODO: take some time to understand this high number properly
  => invoke .... 150,593,034.85 op/s
  bind invoke .. 147,298,552.42 op/s
 */

const arrow = () => this.toString();
const bound =function() { return this.toString(); }.bind(this);
require('do-you-even-bench')([
  { name: '=> create',  fn() { return () => this.toString(); }},
  { name: 'bind create',  fn() { return function() { return this.toString(); }.bind(this)}},
  { name: '=> invoke',  fn() { return arrow(); }},
  { name: 'bind invoke',  fn() { return bound(); }},
]);

