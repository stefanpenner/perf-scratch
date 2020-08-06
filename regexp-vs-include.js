const REGEXP = /^#i/;

const string = 'some large string with things n it string';
require('do-you-even-bench')([
  { name: 'regexp',                    fn: function() { return string.match(REGEXP); }},
  { name: 'startsWith seperate char',  fn: function() { return string.startsWith('#') === true && string.startsWith('i') === true; }},
  { name: 'startsWith 2 char',         fn: function() { return string.startsWith('#i') === true; }},
  { name: 'charAt',                    fn: function() { return string.charAt(0) === '#' && string.charAt(1) === 'i' }},
  { name: 'charCodeAt',                fn: function() { return string.charCodeAt(0) === 35 && string.charCodeAt(1) === 105; }},
]);
