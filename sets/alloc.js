const MISSING = {};
const OSet = require('./implementations/ordered-set')
const FOSet = require('./implementations/faster-ordered-set')
new FOSet().add(MISSING);
console.log('alloc');
require('do-you-even-bench')([
  { name: 'new FOSet()',     fn() { return new FOSet()}},
  { name: '[]',              fn() { return [] }},
  { name: 'new FOSet().add', fn() { return new FOSet().add(MISSING); }},
  { name: '[].push',         fn() { return [].push(MISSING); }},
  { name: 'new Set().add',   fn() { return new Set().add(MISSING); }},
  { name: 'new OSet().add',  fn() { return new OSet().add(MISSING); }},
]);

