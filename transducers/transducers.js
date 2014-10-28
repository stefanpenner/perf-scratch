var t = require('transducers.js');
var _ = require('lodash');
var range = _.range(0, 1000).slice();

function square(x) { return x * x; }
function odd(x)    { return x % 1 === 0; }

function native(range, limit) {
  return range.map(square).filter(odd).slice(0, limit);
}

function lodash(range, limit) {
  return _(range).map(square).filter(odd).take(limit).value();
}

function manual(range, limit) {
  var result = new Array(limit);
  var entry;
  var count = 0;
  var index = 0;
  var length = range.length;

  while (count < limit && index < length) {
    var entry = range[index];

    entry = square(entry);

    if (odd(entry)) {
      result[count] = entry;
      count++;
    }

    index++;
  }

  result.length = count;
  return result;
}

var transducer = t.compose(
  t.cat,
  t.map(square),
  t.filter(odd),
  t.take(20)
);

if (t.seq) {
  t.sequence = t.seq;
}

//while(true) {
//  var result = t.sequence(transducer, [range]);
//}

require('../bench')([
  { name: 'native',      fn: function() { var result = native(range, 20);               } },
  { name: 'lodash',      fn: function() { var result = lodash(range, 20);               } },
  { name: 'transducer',  fn: function() { var result = t.sequence(transducer, [range]); } },
  { name: 'manual',      fn: function() { var result = manual(range, 20);               } }
]);
