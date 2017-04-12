

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
  this.clear();
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
    this.presenceSet = undefined;//Object.create(null);
    this._value = undefined;
    this._list  = undefined;
    this.size = 0;
  },

  get list() {
    let list = this._list;
    if (list !== undefined) { return list; }
    let size = this.size;
    if (size === 0) { return this._list = []; }
    if (size === 1) { return this._list = [this.value]; }
  },

  /**
    @method add
    @param obj
    @param guid (optional, and for internal use)
    @return {Ember.OrderedSet}
    @private
  */
  add(obj) {
    let size = this.size;

    if (size === 1 && this._value === obj) {
      return this;
    }

    if (size === 0) {
      this._value = obj;
      this.size = 1;
      return this;
    }

     if (size < 100) {
      let list = this.list;
      for (let i = 0; i < list.length; i++) {
        if (list[i] === obj) {
          return this;
        }
      }
      this.size = list.push(obj);
      return this;
    }

    return this._slowAdd(obj, size)

  },

  _slowAdd(obj, size) {
    if (size === 100) {
      // upgrade to index set
      this.presenceSet = Object.create(null);
      let list = this.list;
      for (let i = 0; i < list.length; i++) {
        this.presenceSet[guidKey(list[i])];
      }
    }
    let guid = _guid;
    let presenceSet = this.presenceSet;

    if (presenceSet !== undefined && presenceSet[guid] !== true) {
      presenceSet[guid] = true;
      this.size = this.list.push(obj);
    } else {
      this.list = obj;
      this.size = 1;
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
    let size = this.size;

    if (size === 0) { return false;}
    if (size === 1) {
      if (this._value === obj) {
        this._value = undefined;
        this.size = 0;
        return true;
      }
      return false;
    }

    if (size >= 100) {
      if (presenceSet[guid] === true) {
        delete presenceSet[guid];
      } else {
        return false;
      }
    }

    let list = this.list;
    for (let i = 0; i < list.length; i++) {
      if (list[i] === obj) {
        list.splice(i, 1);
        return true;
      }
    }
    return false;
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
    let size = this.size;
    if (size === 0) { return false; }
    if (size === 1) { return this._value === obj; }
    if (size < 100 /* some threshold */) {
      let list = this.list;
      for (let i = 0; i < list.length; i++) {
        if (list[i] === obj) {
          return true;
        }
      }

      return false;
    } else {
      return this.presenceSet[guid] === true;
    }
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

    if (this.presenceSet) {
      set.presenceSet = copyNull(this.presenceSet);
      set.list = this.toArray();
      set.size = this.size;
    }

    return set;
  }
};
