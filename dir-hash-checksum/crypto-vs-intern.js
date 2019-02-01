'use strict';
/*
  intern ............................ 66,045,211.48 op/s
  crypo ................................ 368,797.17 op/s
  string (bad lots of collisions) .... 4,747,613.80 op/s
  */

const fs = require('fs');
const walkSync = require('walk-sync');
const path = require('path');
const PATHS = walkSync('../', { includeBasePath: true }).map(x => path.join(__dirname, x));
const crypto = require('crypto');

const x = PATHS.join().length;
const y = PATHS.map(x => crypto.createHash('md5').update(x).digest('hex')).join().length;

function makeDict(paths) {
  const dict = Object.create(null);
  for (let i = 0; i < paths.length; i++) {
    dict[paths[i]] = true;
  }
  return dict;
}
function makeRopeDict(paths) {
  const dict = Object.create(null);
  for (let i = 0; i < paths.length; i++) {
    dict['rope:' + paths[i]] = true;
  }
  return dict;
}

function makeCryptoDict(paths) {
  const dict = Object.create(null);
  for (let i = 0; i < paths.length; i++) {
    dict[crypto.createHash('md5').update(paths[i]).digest('hex')] = true;
  }
  return dict;
}

function makeRopeCryptoDict(paths) {
  const dict = Object.create(null);
  for (let i = 0; i < paths.length; i++) {
    dict['crypto:' + crypto.createHash('md5').update(paths[i]).digest('hex')] = true;
  }
  return dict;
}

function stringHashForward(str) {
  var hash = 5381,
      i    = str.length;

  for (var i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }

  /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
   * integers. Since we want the results to be always positive, convert the
   * signed int to an unsigned by doing an unsigned bitshift. */
  return hash >>> 0;
}

const DICT_INTERN = Object.create(null);
const DICT_CRYPTO = Object.create(null);
const DICT_STRING_HASH = Object.create(null);
let i = 0;
let c = 0;
let s = 0;
const LENGTH = PATHS.length;

require('do-you-even-bench')([
  {
    name: 'intern',  fn: function() {
      DICT_INTERN[PATHS[i]] = true;
      i = i++ % LENGTH;
      return DICT_INTERN;
    }
  },
  {
    name: 'crypo',  fn: function() {
      DICT_INTERN[crypto.createHash('md5').update(PATHS[c]).digest('hex')] = true;
      c = c++ % LENGTH;
      return DICT_INTERN;
    }
  },

  {
    name: 'string (bad lots of collisions)',  fn: function() {
      DICT_INTERN[stringHashForward(PATHS[s])] = true;
      s = s++ % LENGTH;
      return DICT_INTERN;
    }
  },
]);
