function A() { }

Object.defineProperty(A.prototype, 'ready', {
  value: true
});

function B() { }

Object.defineProperty(B.prototype, 'ready', {
  get: function() {
    return true;
  }
});

function Stream() {
  this.ready = true;
}
function C() {
  this._stream = new Stream();
}

Object.defineProperty(C.prototype, 'ready', {
  get: function() {
    return this._stream.ready;
  }
});

function D() {
  this._stream = new Stream();
}

Object.defineProperty(D.prototype, 'ready', {
  get: function() {
    try {  } finally { }
    return this._stream.ready;
  }
});

function E() {
  this._stream = new Stream();
}

E.prototype._getReader = function() {
  return this;
};

E.prototype._setReader = function() {
  return this;
};

Object.defineProperty(E.prototype, 'ready', {
  get: function() {
    if (this._getReader() !== this) {
      throw new TypeError("This stream reader has released its lock on the original stream and can no " +
                          "longer be used");
    }

    this._setReader(undefined);
    try {
      return this._stream.ready;
    } finally {
      this._setReader(this);
    }
  }
});

function F() {
  this._stream = new Stream();
}

F.prototype._getReader = function() {
  return this;
};

F.prototype._setReader = function() {
  return this;
};

Object.defineProperty(F.prototype, 'ready', {
  get: function() {
    if (this._getReader() !== this) {
      throw new TypeError("This stream reader has released its lock on the original stream and can no " +
                          "longer be used");
    }

    this._setReader(undefined);
    var ret = this._stream.ready;
    this._setReader(this);
    return ret;
  }
});


function G() {
  this._stream = new Stream();
}

G.prototype._getReader = function() {
  return this;
};

G.prototype._setReader = function() {
  return this;
};

function throwReleasedLockError() {
  throw new TypeError("This stream reader has released its lock on the original stream and can no " +
                      "longer be used");
}

Object.defineProperty(G.prototype, 'ready', {
  get: function() {
    if (this._getReader() !== this) {
      throwReleasedLockError();
    }

    this._setReader(undefined);
    var ret = this._stream.ready;
    this._setReader(this);
    return ret;
  }
});

var a = new A();
var b = new B();
var c = new C();
var d = new D();
var e = new E();
var f = new F();
var g = new G();

require('do-you-even-bench')([
  { name: 'A', fn: function() { return a.ready; } },
  { name: 'B', fn: function() { return b.ready; } },
  { name: 'C', fn: function() { return c.ready; } },
  { name: 'D', fn: function() { return d.ready; } },
  { name: 'E', fn: function() { return e.ready; } },
  { name: 'f', fn: function() { return f.ready; } },
  { name: 'g', fn: function() { return g.ready; } },
]);


