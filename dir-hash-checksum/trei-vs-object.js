'use strict';
/*
 dict .................. 2,150.80 op/s
  trie-one ................. 40.77 op/s
  trie-two ................. 20.15 op/s
  crypo-dict ............... 61.21 op/s
  bad-crypo-dict .......... 348.89 op/s
  xxh-dict ................ 188.39 op/s
  */
const walkSync = require('walk-sync');
const path = require('path');
const PATHS = walkSync('../', { includeBasePath: true }).map(x => path.join(__dirname, x));
const TrieOne = require('./trie-one');
const TrieTwo = require('./trie-two');
const XXHash = require('xxhash');
const crypto = require('crypto');

function makeDict(paths) {
  const dict = Object.create(null);
  for (let i = 0; i < paths.length; i++) {
    dict[paths[i]] = true;
  }
  return dict;
}

function makeTrieOne(paths) {
  const trie = new TrieOne();
  for (let i = 0; i < paths.length; i++) {
    trie.insert(paths[i]);
  }
  return trie;
}

function makeTrieTwo(paths) {
  const trie = new TrieTwo();
  for (let i = 0; i < paths.length; i++) {
    trie.add(paths[i]);
  }
  return trie;
}

function makeCryptoDict(paths) {
  const dict = Object.create(null);
  for (let i = 0; i < paths.length; i++) {
    dict[crypto.createHash('md5').update(paths[i]).digest('hex')] = true;
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

function makeBadCryptoDict(paths) {
  const dict = Object.create(null);
  for (let i = 0; i < paths.length; i++) {
    dict[stringHashForward(paths[i])] = true;
  }
  return dict;
}

function makeXXHCryptoDict(paths) {
  const dict = Object.create(null);
  for (let i = 0; i < paths.length; i++) {
    dict[XXHash.hash(Buffer.from(paths[i]), 0xDEADBEEF)] = true;
  }
  return dict;
}


class Foo {
  constructor() {
    this.A = makeDict(PATHS);
    this.B = makeCryptoDict(PATHS);
    this.C = makeTrieOne(PATHS);
    this.D = makeTrieTwo(PATHS);
  }
}

require('do-you-even-bench')([
  { name: 'dict',  fn: function() { return makeDict(PATHS); } },
  { name: 'trie-one',  fn: function() { return makeTrieOne(PATHS); } },
  { name: 'trie-two',  fn: function() { return makeTrieTwo(PATHS); } },
  { name: 'crypo-dict',  fn: function() { return makeCryptoDict(PATHS); } },
  { name: 'bad-crypo-dict',  fn: function() { return makeBadCryptoDict(PATHS); } },
  { name: 'xxh-dict',  fn: function() { return makeXXHCryptoDict(PATHS); }},
]);
