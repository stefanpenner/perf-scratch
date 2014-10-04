function Map() {
  this.values = Object.create(null);
}


Map.prototype.forEach = function(cb) {
  var values = this.values;

  for (var key in values) {
    cb(key);
  }
};

//Map.prototype.forEach = function(cb) {
//  var values = Object.keys(this.values);
//
//  for (var i =0, l = values.length; i < l; i++) {
//    cb(values[i]);
//  }
//};


Map.prototype.set = function(key, value) {
  this.values[key] = value;
};

Map.prototype.delete = function(key) {
  delete this.values[key];
};

while(true) {
  var m = new Map();

  m.set('hi', 1);
  m.set('h2', {});
  m.set('h3', 5);

  m.forEach(function(key) {

  });

  m.delete('h2');
  m.forEach(function(key) {

  });
}


