var Benchmark = require('benchmark');

module.exports = function(suites) {
  var suite = new Benchmark.Suite();

  suites.forEach(function(s) {
    suite.add(s.name, s.fn);
  });

  suite.on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').pluck('name'));
  });

  suite.run({ 'async': true });
}
