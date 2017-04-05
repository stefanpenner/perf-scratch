const MISSING = {};
console.log('alloc');
require('do-you-even-bench')([
  { name: '[].push',        fn() { return [].push(MISSING); }},
  { name: 'new Set().add', fn() { return new Set().add(MISSING); }},
]);

