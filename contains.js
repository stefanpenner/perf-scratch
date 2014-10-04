
Array.prototype.contains1 = function contains1(searchElement /*, fromIndex */) {
  var l = this.length;

  if (l=== 0) {
    return false;
  }

  var n = arguments.length === 2 ? arguments[1] : 0;

  // 8. If n ≥ len, return false.
  if (n >= l) {
    return false;
  }

  var k;

  if (n >= 0) {
    k = n;
  } else {
    k = l - Math.abs(n);
    if (k < 0) {
      k = 0;
    }
  }

  if (typeof searchElement === 'number' &&
      isNaN(searchElement)) {
    return containsNan(this, k, l);
  } else {
    while (k < l) {
      var elementK = this[k];

      if (searchElement === elementK) {
        return true;
      }

      k++;
    }
  }

  return false;
};

function containsNan(collection, k, l) {
  while (k < l) {
    var elementK = collection[k];

    if (isNaN(elementK)) {
      return true;
    }

    k++;
  }

  return false;
}

Array.prototype.contains2 = function contains2(searchElement /*, fromIndex */) {
  var l = this.length;

  if (l=== 0) {
    return false;
  }

  var n = arguments.length === 2 ? arguments[1] : 0;

  // 8. If n ≥ len, return false.
  if (n >= l) {
    return false;
  }

  var k;

  if (n >= 0) {
    k = n;
  } else {
    k = l - Math.abs(n);
    if (k < 0) {
      k = 0;
    }
  }

  var nan = typeof searchElement === 'number' &&
      isNaN(searchElement);

    while (k < l) {
      var elementK = this[k];

      if (searchElement === elementK || nan &&
        typeof elementK === 'number' && isNaN(elementK)) {
        return true;
      }

      k++;
    }

  return false;
};

var LIMIT = 100;
var entry = Math.random() * LIMIT;
var list = new Array(LIMIT);

for (var i =0; i< LIMIT; i++) {
  list[i] = Math.random() * LIMIT;
}

require('./bench')([
  { name: 'contains1', fn: function() { list.contains1(entry); } },
  { name: 'contains2', fn: function() { list.contains2(entry); } },
]);
