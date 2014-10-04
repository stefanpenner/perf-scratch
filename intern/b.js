  'use strict';
  var obj = Object.create(null);
  //obj['foo'] = 1;
  //delete obj['foo'];
  var key = 'hello';

  function IAMMETHOD() {
    var a = new Array(1000);
    for (var i = 0; i < 1000 ;i++) {
      a[i] = obj[key];
    }
  }

IAMMETHOD();
%OptimizeFunctionOnNextCall(IAMMETHOD);
IAMMETHOD();
