(function() {
  'use strict';
  var obj = {};
  obj['foo'] = 1;
  delete obj['foo'];
  var key = 1;

  function IAMMETHOD() {
    var a = new Array(1000);
    for (var i = 0; i < 1000 ;i++) {
      a[i] = obj[key];
    }
  }

  while (true) {
    IAMMETHOD();
  }
}());
