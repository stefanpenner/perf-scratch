var fs = require('fs');
var raw = fs.readFileSync('./data.json', 'UTF8');
var assert = require('assert');
var JSONBig = require('json-bigint');
var parsed = JSON.parse(raw);

// ensure stuff works..
assert(JSON.parse(raw).data);
assert(JSONBig.parse(raw).data);
assert(JSON.stringify(parsed).length === 310151)
assert(JSONBig.stringify(parsed).length === 310151)

console.log('comparing various JSON parse techniques, on a big json object (' + raw.length + ' bytes) encoded in a string');
// tests
require('do-you-even-bench')([
  {
    name: 'JSON.parse',
    fn: function() {
      return JSON.parse(raw);
    }
  },
  {
    name: 'JSONBig.parse',
    fn: function() {
      return JSONBig.parse(raw);
    }
  },
  {
    name: 'JSON.stringify',
    fn: function() {
      return JSON.parse(raw);
    }
  },
  {
    name: 'JSONBig.stringify',
    fn: function() {
      return JSONBig.parse(raw);
    }
  }
])
