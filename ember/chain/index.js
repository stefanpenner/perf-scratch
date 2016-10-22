var Ember = require('./ember.prod.js');

var count = 0;

function immutable() {
  this.volatile();
  this.readOnly();
  this._getter = cachedGetter(this._getter);
  this._oldGetter = this._getter;
  this._setter = null;

  return this;
}

function UNDEFINED() {}

function cachedGetter(getter) {
  // return function(keyName) {
  //   return getter.call(this, keyName);
  // };

  return function(keyName) {
    var meta = Ember.meta(this);
    var cache = meta.__cache || (meta.__cache = {});
    var cachedValue = cache[keyName];

    if (cachedValue === UNDEFINED) {
      return undefined;
    } else if (cachedValue !== undefined) {
      return cachedValue;
    }

    var value = getter.call(this, keyName);

    if (value === undefined) {
      cache[keyName] = UNDEFINED;
    } else {
      cache[keyName] = value;
    }
    return value;
  };
}

var Descriptor = Ember.computed(function() {}).constructor;

function D(descriptor) {
  Descriptor.call(this);
  this.descriptor = descriptor;
}
var m;
var cache = {};

D.prototype = Object.create(Descriptor.prototype);
D.prototype.constructor = Descriptor.prototype;
D.prototype.setup = function(target, keyName) {
  var descriptor = this.descriptor;
  Object.defineProperty(target, keyName, {
    get: function() {
      var meta = Ember.meta(this);
      debugger;
      var cache = meta.writableCache();
      var cachedValue = cache[keyName];

      if (cachedValue === UNDEFINED) {
        return undefined;
      } else if (cachedValue !== undefined) {
        return cachedValue;
      }

      var value = descriptor.get.call(this, keyName);

      if (value === undefined) {
        cache[keyName] = UNDEFINED;
      } else {
        cache[keyName] = value;
      }
      return value;
    }
  });
  return this;
};

function descriptor(arg) {
  return new D(arg);
}

var Obj = Ember.Object.extend({
  first: 'stef',
  last: 'penner',
  fullNameCP: Ember.computed(function() {
    return this.first + ' ' + this.last;
  }),
  fullNameV: Ember.computed(function() {
    return this.first + ' ' + this.last;
  }).volatile(),
  fullNameI: immutable.call(Ember.computed(function() {
    return this.first + ' ' + this.last;
  })),
  fullNameD: descriptor({
    get: function() {
      return this.first + ' ' + this.last;
    }
  })
});

var obj = Obj.create();
var m = Ember.meta(obj);

console.log(obj.get('fullNameCP'));
console.log(obj.get('fullNameV'));
console.log(obj.get('fullNameI'));
console.log(obj.get('fullNameD'));
console.log(obj.fullNameD);

require('do-you-even-bench')([
  // {
  //   name: 'notify member',
  //   fn: function() {
  //     Ember.propertyDidChange(obj, 'first');
  //   }
  // },

  // {
  //   name: 'notify cp',
  //   fn: function() {
  //     Ember.propertyDidChange(obj, 'fullNameCP');
  //   }
  // },


  // {
  //   name: 'notify V',
  //   fn: function() {
  //     Ember.propertyDidChange(obj, 'fullNameV');
  //   }
  // },


  // {
  //   name: 'notify I',
  //   fn: function() {
  //     Ember.propertyDidChange(obj, 'fullNameI');
  //   }
  // },

  // {
  //   name: 'notify + get cp',
  //   fn: function() {
  //     Ember.propertyDidChange(obj, 'fullNameCP');
  //     return obj.get('fullNameCP');
  //   }
  // },

 // {
  //   name: 'notify + get V',
  //   fn: function() {
  //     Ember.propertyDidChange(obj, 'fullNameV');
  //     return obj.get('fullNameCP');
  //   }
  // },

 // {
  //   name: 'notify + get I',
  //   fn: function() {
  //     Ember.propertyDidChange(obj, 'fullNameI');
  //     return obj.get('fullNameI');
  //   }
  // },

 {
    name: 'get I',
    fn: function() {
      return obj.get('fullNameI');
    }
  },

 {
    name: 'get D',
    fn: function() {
      return obj.get('fullNameD');
    }
  },

  {
    name: 'D',
    fn: function() {
      return obj.fullNameD;
    }
  },

  {
    name: 'get cp',
    fn: function() {
      return obj.get('fullNameCP');
    }
  },

 {
    name: 'get V',
    fn: function() {
      return obj.get('fullNameV');
    }
  },
])
