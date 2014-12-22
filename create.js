function Eric() {

}

var Kris = {};
Eric.prototype = Kris;

require('./bench')([
  { name: 'new',      fn: function() { return new Eric(); } },
  { name: 'o create', fn: function() { return Object.create(Kris); } },
]);


