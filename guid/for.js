var GUID_KEY = '__ember' + (+ new Date());

var GUID_DESC = {
  writable:    false,
  configurable: false,
  enumerable:  false,
  value: null
};
var uuid = 0;

var o_defineProperty = Object.defineProperty;
var numberCache = { };
var stringCache = { };

function guidFor(obj) {
  // special cases where we don't want to add a key to object
  if (obj === undefined) return "(undefined)";
  if (obj === null) return "(null)";

  var ret;
  var type = typeof obj;

  // Don't allow prototype changes to String etc. to change the guidFor
  switch(type) {
    case 'boolean':
      return obj ? '(true)' : '(false)';
    case 'function':
      if (obj[GUID_DESC]) {
        return obj[GUID_DESC];
      } else {
        return obj[GUID_DESC] = uuid++;
      }
      break;
    case 'object':
      if (obj[GUID_KEY]) return obj[GUID_KEY];
      if (obj === Object) return '(Object)';
      if (obj === Array)  return '(Array)';
      ret = uuid++;

      if (obj[GUID_KEY] === null) {
        obj[GUID_KEY] = ret;
      } else {
        GUID_DESC.value = ret;
        o_defineProperty(obj, GUID_KEY, GUID_DESC);
      }
      return ret;
    default: return obj;
  }
}
var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

function OO() {
}

//// add tests
//suite.add('guidFor new obj', function() {
//  guidFor({});
//})
//.add('guidFor new instance', function() {
//  guidFor(new OO());
//})
//.add('guidFor function', function() {
//  guidFor(function(){});
//})
//// add listeners
//.on('cycle', function(event) {
//  console.log(String(event.target));
//})
//.on('complete', function() {
//  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
//})
//// run async
//.run({ 'async': true });



(function() {
  while(true) {
    guidFor(function(){});
    guidFor(true);
    guidFor(false);
    guidFor([]);
    guidFor(Object);
    guidFor(Array);
    guidFor(1);
    guidFor(null);
    guidFor(undefined);
    guidFor(new OO());
  }
}());
