'use strict'
/*
 *
 *
 *
testing
- xxh pure
- xxh pure + reuse
- xxh native
- murmurhash3jsRevisited
- string-hash (collsions common)
- string-hash-forward (collisions common)
- md5 + hex
- md5 + base64
- sha1 + hex
- sha1 + base64
- sha256 + hex
- sha256 + base64
running first test, please wait...
  xxh pure ..................................... 311,503.34 op/s
  xxh pure + reuse ............................. 333,059.55 op/s
  xxh native ................................. 2,614,670.55 op/s
  murmurhash3jsRevisited ....................... 322,880.64 op/s
  string-hash (collsions common) ............. 3,897,143.59 op/s
  string-hash-forward (collisions common) .... 4,528,759.20 op/s
  md5 + hex .................................... 411,181.46 op/s
  md5 + base64 ................................. 408,358.86 op/s
  sha1 + hex ................................... 415,767.51 op/s
  sha1 + base64 ................................ 409,282.87 op/s
  sha256 + hex ................................. 378,464.64 op/s
  sha256 + base64 .............................. 378,379.54 op/s
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
