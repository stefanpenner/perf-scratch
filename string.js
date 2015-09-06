var fs = require('fs');
var j = fs.readFileSync('json.json', 'utf8'); // 500k json file

var a = JSON.stringify(j);
var b = JSON.stringify(j, function(key, value) {
  return value;
});
var c = JSON.stringify(j, 2);
var d = JSON.stringify(j, function(key, value) {
  return value;
},2);

require('do-you-even-bench')([
  { name: 'replace w/o replace',      fn: function() { return a.replace(/foo/g, 'bar'); }},
  { name: 'replace w replace  ',      fn: function() { return b.replace(/foo/g, 'bar'); }},
  { name: 'replace w/o replace',      fn: function() { return c.replace(/foo/g, 'bar'); }},
  { name: 'replace w replace  ',      fn: function() { return d.replace(/foo/g, 'bar'); }},
]);

