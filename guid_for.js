Ember = { };
Ember.GUID_PREFIX = 'ember';

var o_defineProperty = Object.defineProperty,
    o_create = Object.create,
    // Used for guid generation...
    GUID_KEY = '__ember'+ (+ new Date()),
    uuid         = 0,
    numberCache  = [],
    stringCache  = {};

Ember.GUID_KEY = GUID_KEY;

var GUID_DESC = {
  writable:    false,
  configurable: false,
  enumerable:  false,
  value: null
};

Ember.generateGuid = function generateGuid(obj, prefix) {
  if (!prefix) prefix = Ember.GUID_PREFIX;
  var ret = (prefix + (uuid++));
  if (obj) {
    GUID_DESC.value = ret;
    o_defineProperty(obj, GUID_KEY, GUID_DESC);
  }
  return ret;
};

Ember.guidFor = function guidFor(obj) {
  var ret;
      ret = numberCache[obj];
      if (!ret) ret = numberCache[obj] = 'nu'+obj;
      return ret;
};

var META_DESC = {
  writable:    true,
  configurable: false,
  enumerable:  false,
  value: null
};

var META_KEY = Ember.GUID_KEY+'_meta';
Ember.META_KEY = META_KEY;

function Meta(obj) {
  this.descs = {};
  this.watching = {};
  this.cache = {};
  this.source = obj;
  this[Math.random()] = 1;
}

Meta.prototype = {
  descs: null,
  deps: null,
  watching: null,
  listeners: null,
  cache: null,
  source: null,
  mixins: null,
  bindings: null,
  chains: null,
  chainWatchers: null,
  values: null,
  proto: null
};

var EMPTY_META = new Meta(null);

MANDATORY_SETTER = false;
if (MANDATORY_SETTER) { EMPTY_META.values = {}; }

Ember.EMPTY_META = EMPTY_META;

Ember.meta = function meta(obj, writable) {

  var ret = obj[META_KEY];
  if (writable===false) return ret || EMPTY_META;

  if (!ret) {
    if (!isDefinePropertySimulated) o_defineProperty(obj, META_KEY, META_DESC);

    ret = new Meta(obj);

    if (MANDATORY_SETTER) { ret.values = {}; }

    obj[META_KEY] = ret;

    // make sure we don't accidentally try to create constructor like desc
    ret.descs.constructor = null;

  } else if (ret.source !== obj) {
    if (!isDefinePropertySimulated) o_defineProperty(obj, META_KEY, META_DESC);

    ret = o_create(ret);
    ret.descs    = o_create(ret.descs);
    ret.watching = o_create(ret.watching);
    ret.cache    = {};
    ret.source   = obj;

    if (MANDATORY_SETTER) { ret.values = o_create(ret.values); }

    obj[META_KEY] = ret;
  }
  return ret;
};

Ember.getMeta = function getMeta(obj, property) {
  var meta = Ember.meta(obj, false);
  return meta[property];
};

Ember.setMeta = function setMeta(obj, property, value) {
  var meta = Ember.meta(obj, true);
  meta[property] = value;
  return value;
};





Ember.guidFor(1);
%OptimizeFunctionOnNextCall(Ember.guidFor);

Ember.guidFor(1);
