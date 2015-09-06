var intern = "12312312312312345040120239123000123123123123123";
var nonIntern = "1231231231231234504012023912300012" + "3123123123123";
var a = "10";
var b = "1" + "0";

require('do-you-even-bench')([

  { name: '~~"10"',               fn: function() { ~~"10";                  } },
  { name: '~~a',                  fn: function() { ~~a;                     } },
  { name: '~~b',                  fn: function() { ~~b;                     } },
  { name: '~~intern',             fn: function() { ~~intern;                } },
  { name: '~~nonIntern',          fn: function() { ~~nonIntern;             } },
  { name: '+intern',              fn: function() { +intern;                 } },
  { name: '+nonIntern',           fn: function() { +nonIntern;              } },
  { name: 'Number intern',        fn: function() { Number(intern);          } },
  { name: 'Number nonInterned',   fn: function() { Number(nonIntern);       } },
  { name: 'parseInt intern',      fn: function() { parseInt(intern);        } },
  { name: 'parseInt intern',      fn: function() { parseInt(intern);        } },
  { name: 'parseInt nonInterend', fn: function() { parseInt(nonIntern);     } },
  { name: 'parseInt intern',      fn: function() { parseInt(intern, 10);    } },
  { name: 'parseInt nonInterend', fn: function() { parseInt(nonIntern, 10); } }
]);
