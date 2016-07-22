var a = Math.random().toString(36).substring();
var b = Math.random().toString(36).substring();
var c = Math.random().toString(36).substring();

var a = a+b+c;

require('do-you-even-bench')([
  { name: 'charAt',         fn: function() {
    var l = a.length;
    return a.charAt(l - 7) !== 'b' &&
    a.charAt(l - 6) !== 'i' &&
    a.charAt(l - 5) !== 'n' &&
    a.charAt(l - 4) !== 'd' &&
    a.charAt(l - 3) !== 'i' &&
    a.charAt(l - 2) !== 'n' &&
    a.charAt(l - 1) !== 'g';
  }
  },

  { name: 'charAt mix',         fn: function() {
    var l = a.length;
    return a.charAt(l - 1) !== 'g' && a.indexOf('Binding', l - 7) === -1;
  }
  },

{ name: 'charCodeAt  mix',         fn: function() {
    var l = a.length;
    return a.charCodeAt(l - 7) !== 66 && a.indexOf('Binding', l - 7) === -1;
  }
  },
  { name: 'indexOf',        fn: function() { return 1 !== a.indexOf('Binding', a.length - 7); } },
  { name: 'RegExp',         fn: function() { return 1 !==  /^.+Binding$/.test(a); }},
  { name: 'substring',      fn: function() { return 'Binding' !==  a.substring(a.length - 7, a.length);}}
]);


