function Foo() {}

var Ember = {};
var uuid = 0;

var GUID_DESC = {
  writable:    false,
  configurable: false,
  enumerable:  false,
  value: null
};

var GUID_KEY = '__ember'+ (+ new Date());

Foo.generateGuid = function generateGuid(obj, prefix) {
  if (!prefix) prefix = Ember.GUID_PREFIX;
  var ret = (prefix + (uuid++));
  if (obj) {
    GUID_DESC.value = ret;
    Object.defineProperty(obj, GUID_KEY, GUID_DESC);
  }
  return ret;
};

Foo.generateGuid({});

%OptimizeFunctionOnNextCall(Foo.generateGuid);

Foo.generateGuid({});
Foo.generateGuid(1);

print(%GetOptimizationStatus(Foo.generateGuid));
