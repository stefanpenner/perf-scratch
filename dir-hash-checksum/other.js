'use strict';
/*
testing
- dict
- rope dict
- crypto dict
- crypto rop dict
running first test, please wait...
  dict ................... 2,191.04 op/s
  rope dict ................ 412.04 op/s
  crypto dict ............... 56.00 op/s
  crypto rop dict ........... 50.84 op/s
  */

const fs = require('fs');
const walkSync = require('walk-sync');
const path = require('path');
const PATHS = walkSync('../', { includeBasePath: true }).map(x => path.join(__dirname, x));

const crypto = require('crypto');

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
require('do-you-even-bench')([
  { name: 'dict',  fn: function() { return makeDict(PATHS); } },
  { name: 'rope dict',  fn: function() { return makeRopeDict(PATHS); } },
  { name: 'crypto dict',  fn: function() { return makeCryptoDict(PATHS); }},
  { name: 'crypto rop dict',  fn: function() { return makeRopeCryptoDict(PATHS); }},
]);
