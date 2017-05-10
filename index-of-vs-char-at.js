var string = 'foo.{bar,baz}';

require('do-you-even-bench')([
  { name: 'charCodeAt',
    fn: function() {
      for (var i = 0; i < string.length; i ++) {
        if (string.charCodeAt(i) === 123) {
          return i;
        }
      }
      return -1;
    }
  },
  { name: 'indexOf', fn: function() { return string.indexOf('{'); } }
]);


// testing
// - charCodeAt
// - indexOf
// running first test, please wait...
//  charCodeAt ... 48,437,997.64 op/s
//  indexOf ...... 17,884,808.89 op/s

/*
npm version
{ 'perf-scratch': '1.0.0',
  npm: '4.0.5',
  ares: '1.10.1-DEV',
  cldr: '30.0.3',
  http_parser: '2.7.0',
  icu: '58.2',
  modules: '51',
  node: '7.4.0',
  openssl: '1.0.2j',
  tz: '2016j',
  unicode: '9.0',
  uv: '1.10.1',
  v8: '5.4.500.45',
  zlib: '1.2.8' }
*/
