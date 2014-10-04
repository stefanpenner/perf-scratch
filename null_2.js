function isNull(a) {
  return a === null;
}

(function() {
while (true) {
  isNull({});
}
}());
