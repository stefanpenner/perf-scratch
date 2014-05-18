function create() {
  var obj = { __proto__: null };
  delete obj.key;
  return obj;
}

while (true) {
  create();
}
