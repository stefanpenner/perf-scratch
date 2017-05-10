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


