function intern(str) {
  var obj = {};
  obj[str] = 1;
  for (var key in obj) {
    if (key === str) {
      return key;
    }
  }
  return str;
}

function symbol(debug) {
  return intern(debug + ' [id=' + GUID_KEY + Math.floor(Math.random() * new Date()) + ']');
}

var id =0;
var GUID_KEY = intern('__ember' + (+ new Date()) + '-' + new Date().getTime());

function symbol2(debug) {
  return debug + ' [id=' + id++ + '-' + GUID_KEY +']';
}

function symbol3(debug) {
  return intern(debug + ' [id=' + id++ + '-' + GUID_KEY +']');
}

function symbol4(debug) {
  return intern(debug + ' id' + id++ + '' + GUID_KEY + '');
}

function symbol5(debug) {
  return debug + ' id' + id++ + '' + GUID_KEY + '';
}
function symbol5(debug) {
  return debug + ' id' + id++ + '' + GUID_KEY + '';
}

var zero_a = Symbol("bye");
var zero_b = Symbol("bye");

var one_a = symbol("bye");
var one_b = symbol("bye");

var two_a = symbol2("bye");
var two_b = symbol2("bye");

var three_a = symbol3("bye");
var three_b = symbol3("bye");

var four_a = symbol4("bye");
var four_b = symbol4("bye");

var five_a = symbol5("bye");
var five_b = symbol5("bye");

require('./bench')([
  { name: 'Symbol',  fn: function() { return Symbol('bye'); }},
  { name: 'symbol',  fn: function() { return symbol('bye'); }},
  { name: 'symbol2', fn: function() { return symbol2('bye'); }},
  { name: 'symbol3', fn: function() { return symbol3('bye'); }},
  { name: 'symbol4', fn: function() { return symbol4('bye'); }},
  { name: 'symbol5', fn: function() { return symbol5('bye'); }},

  { name: 'compare Symbol',  fn: function() { return Symbol('bye')  === Symbol('bye');  }},
  { name: 'compare symbol',  fn: function() { return symbol('bye')  === symbol('bye');  }},
  { name: 'compare symbol2', fn: function() { return symbol2('bye') === symbol2('bye'); }},
  { name: 'compare symbol3', fn: function() { return symbol3('bye') === symbol3('bye'); }},
  { name: 'compare symbol4', fn: function() { return symbol4('bye') === symbol4('bye'); }},
  { name: 'compare symbol5', fn: function() { return symbol5('bye') === symbol5('bye'); }},

  { name: 'compare existing Symbol',  fn: function() { return zero_a  === zero_b;   }},
  { name: 'compare existing symbol',  fn: function() { return one_a   === one_b;   }},
  { name: 'compare existing symbol2', fn: function() { return two_a   === two_b;   }},
  { name: 'compare existing symbol3', fn: function() { return three_a === three_b; }},
  { name: 'compare existing symbol4', fn: function() { return four_a  === four_b;  }},
  { name: 'compare existing symbol5', fn: function() { return five_a  === five_b;  }}
]);



