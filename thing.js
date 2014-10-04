var RING = 1000000;
var RANDOM = new Array(RING);
for (var i = 0; i < RING; i++) {
  RANDOM[i] = Math.random() * 100 | 0;
}

function skipListLevel1() {
  var level = 0;
  while (level++ < 32) {
    if (Math.random() < 0.5) {
      return level;
    }
  }
}

function skipListLevel3() {
  var level = 0;
  var offset = Math.random() * RING | 0;
  var x;
  var index;
  while (level++ < 32) {
    var x = level + offset
    if (x % 100) {
      index =  Math.random() * RING | 0;
    } else {
      index = (level + offset) % RING
    }
    if (RANDOM[index]  < 50) {
      return level;
    }
  }
}
function inform(level, total, max, found) {
  console.log('found level:', level, ' attempt:', total, '- ' + (total / max * 1000|0) / 10+ '% :', found);
}

function tick(found, total, max) {
  console.log(' - levels:', found , + (total / max * 1000|0) / 10 + '%');
}
function run() {
  var found = 0;
  var lookup = new Array(32);
  var total = 0;
  var level;
  var max = Math.pow(2, 32);

  while(found < 32) {
    total++;
    level = skipListLevel3();
    if (lookup[level] === undefined) {
      lookup[level] = true;
      found++;
      inform(level, total, max, found);
    }

    if (total % 100000000 === 0) {
      tick(found, total, max);
    }
  }

  return total;
}
console.time('total');
var total = run();
console.log('iterations', total, ' ( ' + (total / Math.pow(2, 32) * 1000|0) / 1000+ ' )' );
console.timeEnd('total');

// y at 1, decay by half each x step
   // y = Math.pow(2, -x)
   // solve for x, now y is between 0 and 1 exclusive (Math.random)
   // x is the probabilty distribution of levels using the above coin flip method
   // x = -Math.log(y)/Math.log(2)
function skipListLevel2() {
  var level = (-1.4426950408889634 * Math.log(Math.random())) | 0;
  // clamp level to 0-31
  return level < 32 ? level : 31;
}

