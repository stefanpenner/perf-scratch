'use strict'
/*
 *
 *
 *
 * s/s/perf-scratch/dir-hash-checksum ╍{} node index.js                                                                                (12s 725ms)
 * 1477328276
 * UINT32 { _low: 16989, _high: 39108, remainder: null }
 * 2562998877
 * testing
 * - xxh pure
 * - xxh pure + reuse
 * - xxh native
 * - md5 + hex
 * - md5 + base64
 * - sha1 + hex
 * - sha1 + base64
 * - sha256 + hex
 * - sha256 + base64
 * running first test, please wait...
 *   xxh pure .............. 323,907.77 op/s
 *   xxh pure + reuse ...... 329,596.20 op/s
 *   xxh native .......... 2,532,263.18 op/s
 *   md5 + hex ............. 383,736.19 op/s
 *   md5 + base64 .......... 395,480.05 op/s
 *   sha1 + hex ............ 423,839.71 op/s
 *   sha1 + base64 ......... 419,817.77 op/s
 *   sha256 + hex .......... 393,169.49 op/s
 *   sha256 + base64 ....... 379,109.45 op/s
 */
const stringHash  = require('string-hash');
const crypto = require('crypto');
const bench = require('do-you-even-bench');
const XXH = require('xxhashjs');
const XXHash = require('xxhash');
const VALUE = 'hashed:/Users/spenner/src/stefanpenner/hash-for-dep/tests/fixtures/node_modules/dedupped/node_modules/dedupped-child/package.json';
const murmurhash3jsRevisited = require('murmurhash3js-revisited');
murmurhash3jsRevisited.inputValidation = false;
const reusedXXH = XXH.h32(0xABCD)
console.log(murmurhash3jsRevisited.x86.hash32("this now returns wrong results"));
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

require('do-you-even-bench')([
  { name: 'xxh pure',  fn: function() { return XXH.h32(VALUE, 0xABCD ).toString() } },
  { name: 'xxh pure + reuse',  fn: function() { return reusedXXH.update(VALUE).digest().toString(); } },
  { name: 'xxh native',  fn: function() { return XXHash.hash(Buffer.from(VALUE), 0xCAFEBABE)}},

  { name: 'murmurhash3jsRevisited',  fn: function() { return murmurhash3jsRevisited.x86.hash32(VALUE); }},
  // this hash will have collisions, which is fine sometimes and bad othertimes
  { name: 'string-hash (collsions common)',  fn: function() { return stringHash(VALUE); }},
  // this hash will have collisions, which is fine sometimes and bad othertimes
  { name: 'string-hash-forward (collisions common)',  fn: function() { return stringHashForward(VALUE); }},

  { name: 'md5 + hex',  fn: function() { return crypto.createHash('md5').update(VALUE).digest('hex'); } },
  { name: 'md5 + base64',  fn: function() { return crypto.createHash('md5').update(VALUE).digest('base64'); } },
  { name: 'sha1 + hex', fn: function() { return crypto.createHash('sha1').update(VALUE).digest('hex'); } },
  { name: 'sha1 + base64', fn: function() { return crypto.createHash('sha1').update(VALUE).digest('base64'); } },
  { name: 'sha256 + hex', fn: function() { return crypto.createHash('sha256').update(VALUE).digest('hex'); } },
  { name: 'sha256 + base64', fn: function() { return crypto.createHash('sha256').update(VALUE).digest('base64'); } },
]);
