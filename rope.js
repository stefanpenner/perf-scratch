var a = 'aaaaaaaaaaaaaaaaa';
var b = 'aaaaaaaaaaaaaaa:a';

var c = ['aaaaaaaaaaaaaaa', ':', 'a'].join();
var d = intern(['aaaaaaaaaaaaaaa', ':', 'a'].join());

function intern(str) {
  var obj = {};
  obj[str] = 1;
  for (var key in obj) {
    if (key === str) return key;
  }
  return str;
}

require('./bench')([
  { name: 'aaa',        fn: function() { if (a === 'aaaaaaaaaaaaaaaaa') { } } },
  { name: 'a:a',        fn: function() { if (b === 'aaaaaaaaaaaaaaa:a') { } } },
  { name: 'a:a rope',   fn: function() { if (c === 'aaaaaaaaaaaaaaa:a') { } } },
  { name: 'a:a intern', fn: function() { if (d === 'aaaaaaaaaaaaaaa:a') { } } },
]);


