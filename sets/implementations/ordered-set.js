

function missingFunction(fn) {
  throw new TypeError(`${Object.prototype.toString.call(fn)} is not a function`);
}

function missingNew(name) {
  throw new TypeError(`Constructor ${name} requires 'new'`);
}

function copyNull(obj) {
  let output = Object.create(null);

  for (let prop in obj) {
    // hasOwnPropery is not needed because obj is Object.create(null);
    output[prop] = obj[prop];
  }

  return output;
}

function copyMap(original, newObject) {
  let keys = original._keys.copy();
  let values = copyNull(original._values);

  newObject._keys = keys;
  newObject._values = values;
  newObject.size = original.size;

  return newObject;
}

/**
  This class is used internally by Ember and Ember Data.
  Please do not use it at this time. We plan to clean it up
  and add many tests soon.

  @class OrderedSet
  @namespace Ember
  @constructor
  @private
*/
module.exports = OrderedSet;
function OrderedSet() {
  if (this instanceof OrderedSet) {
    this.clear();
    this._silenceRemoveDeprecation = false;
  } else {
    missingNew('OrderedSet');
  }
}

/**
  @method create
  @static
  @return {Ember.OrderedSet}
  @private
*/
OrderedSet.create = function() {
  let Constructor = this;

  return new Constructor();
};

OrderedSet.prototype = {
  constructor: OrderedSet,
  /**
    @method clear
    @private
  */
  clear() {
    this.presenceSet = Object.create(null);
    this.list = [];
    this.size = 0;
  },

  /**
    @method add
    @param obj
    @param guid (optional, and for internal use)
    @return {Ember.OrderedSet}
    @private
  */
  add(obj, _guid) {
    let guid = _guid;
    let presenceSet = this.presenceSet;
    let list = this.list;

    if (presenceSet[guid] !== true) {
      presenceSet[guid] = true;
      this.size = list.push(obj);
    }

    return this;
  },

  /**
    @since 1.8.0
    @method delete
    @param obj
    @param _guid (optional and for internal use only)
    @return {Boolean}
    @private
  */
  delete(obj, _guid) {
    let guid = _guid;
    let presenceSet = this.presenceSet;
    let list = this.list;

    if (presenceSet[guid] === true) {
      delete presenceSet[guid];
      let index = list.indexOf(obj);
      if (index > -1) {
        list.splice(index, 1);
      }
      this.size = list.length;
      return true;
    } else {
      return false;
    }
  },

  /**
    @method isEmpty
    @return {Boolean}
    @private
  */
  isEmpty() {
    return this.size === 0;
  },

  /**
    @method has
    @param obj
    @return {Boolean}
    @private
  */
  has(obj, guid) {
    if (this.size === 0) { return false; }

    let presenceSet = this.presenceSet;

    return presenceSet[guid] === true;
  },

  /**
    @method forEach
    @param {Function} fn
    @param self
    @private
  */
  forEach(fn /*, ...thisArg*/) {
    if (typeof fn !== 'function') {
      missingFunction(fn);
    }

    if (this.size === 0) { return; }

    let list = this.list;

    if (arguments.length === 2) {
      for (let i = 0; i < list.length; i++) {
        fn.call(arguments[1], list[i]);
      }
    } else {
      for (let i = 0; i < list.length; i++) {
        fn(list[i]);
      }
    }
  },

  /**
    @method toArray
    @return {Array}
    @private
  */
  toArray() {
    return this.list.slice();
  },

  /**
    @method copy
    @return {Ember.OrderedSet}
    @private
  */
  copy() {
    let Constructor = this.constructor;
    let set = new Constructor();

    set._silenceRemoveDeprecation = this._silenceRemoveDeprecation;
    set.presenceSet = copyNull(this.presenceSet);
    set.list = this.toArray();
    set.size = this.size;

    return set;
  }
};
