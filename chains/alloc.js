function isObject() {}

function ChainNode(parent, key, value) {
    this._parent = parent;
    this._key    = key;

    // _watching is true when calling get(this._parent, this._key) will
    // return the value of this node.
    //
    // It is false for the root of a chain (because we have no parent)
    // and for global paths (because the parent node is the object with
    // the observer on it)
    this._watching = (value === undefined);

    this._chains = undefined;
    this._object = undefined;
    this.count = 0;

    this._value = value;
    this._paths = {};
    if (this._watching) {
      let obj = parent.value();

      if (!isObject(obj)) {
        return;
      }

      this._object = obj;

      addChainWatcher(this._object, this._key, this);
    }
}

function ChainNode2(parent, key, value) {
    this._parent = parent;
    this._key    = key;

    // _watching is true when calling get(this._parent, this._key) will
    // return the value of this node.
    //
    // It is false for the root of a chain (because we have no parent)
    // and for global paths (because the parent node is the object with
    // the observer on it)
    let isWatching = this._watching = (value === undefined);

    this._chains = undefined;
    this._object = undefined;
    this.count = 0;

    this._value = value;
    this._paths = undefined;
    if (isWatching === true) {
      let obj = parent.value();

      if (!isObject(obj)) {
        return;
      }

      this._object = obj;

      addChainWatcher(this._object, this._key, this);
    }
}

new ChainNode(null, 'foo', {});
new ChainNode2(null, 'foo', {});

console.log('ChainNode Alloc')
require('do-you-even-bench')([
  { name: 'Original', fn() { return new ChainNode(null, 'foo', {}); }},
  { name: 'Updated', fn() { return new ChainNode2(null, 'foo', {}); }}
])
