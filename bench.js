var Benchmark = require('benchmark');

function log(message) {
  if (window) {
    var div = document.createElement('div');
    div.textContent = message;
    document.body.appendChild(div);
  } else  {
    console.log(message);
  }
}

module.exports = function(suites) {
  var suite = new Benchmark.Suite();

  log('testing');
  suites.forEach(function(s) {
    log('- ' + s.name);
    suite.add(s.name, s.fn);
  });

  suite.on('cycle', function(event) {
    log(String(event.target));
  })
  .on('complete', function() {
    log('Fastest is ' + this.filter('fastest').pluck('name'));
  });

  setTimeout(function() {
    suite.run({
      'async': true
    });
  }, 1000);
}
