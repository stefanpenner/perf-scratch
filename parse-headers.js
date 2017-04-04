  'use strict';

function intern(str) {
  let obj = {};
  obj[str] = 1;
  for (let key in obj) {
    if (key === str) {
      return key;
    }
  }
  return str;
}

function _toArray(arr) {
  return Array.isArray(arr) ? arr : Array.from(arr);
}

var CLRF = '\r\n';
function parseResponseHeaders(headersString) {
  var headers = Object.create(null);

  if (!headersString) {
    return headers;
  }

  var headerPairs = headersString.split(CLRF);

  headerPairs.forEach(function (header) {
    var _header$split = header.split(':');

    var _header$split2 = _header$split;

    var field = _header$split2[0];

    var value = _header$split2.slice(1);

    field = field.trim();
    value = value.join(':').trim();

    if (value) {
      headers[field] = value;
    }
  });

  return headers;
}

var HEADER_MATCH = /^([^:]*):(.*)$/m;

function parseResponseHeadersNew(headersString) {
  var headers = Object.create(null);

  if (!headersString) {
    return headers;
  }

  var headerPairs = headersString.split(CLRF);
  for (var i = 0; i < headerPairs.length; i++) {
    var header = headerPairs[i];
    var j = 0;
    var foundColon = false;

     for (; j < header.length; j++) {
       if (header.charCodeAt(j) === 58) {
         foundColon = true;
         break;
       }
     }

     if (foundColon === false) {
       break;
     }

    var field = header.substring(0, j).trim();
    var value = header.substring(j + 1, header.length).trim();

    if (value) {
      headers[field] = value;
    }
  }

  return headers;
}

// I don't believe they are ropes when we get them from the platform
const HEADER = [
  'Date: Wed, 15 Mar 2017 15:57:19 GMT',
  'Cache-Control: private, max-age=0, must-revalidate',
  'Last-Modified: Tue, 14 Mar 2017 21:25:26 GMT',
  'Content-Encoding: gzip',
  'X-Powered-By: Express',
  'Vary: Accept-Encoding',
  'Content-Type: application/json'
].join(CLRF);

const HEADER_INTERNED  = intern(HEADER);

console.log(parseResponseHeaders(HEADER));
console.log(parseResponseHeadersNew(HEADER));
require('do-you-even-bench')([
  {
    name: 'new (interned input)',
    fn() {
      parseResponseHeadersNew(HEADER_INTERNED);
    }
  },
  {
    name: 'current (interned input)',
    fn() {
      parseResponseHeaders(HEADER_INTERNED);
    }
  },
  {
    name: 'new',
    fn() {
      parseResponseHeadersNew(HEADER_INTERNED);
    }
  },
  {
    name: 'current',
    fn() {
      parseResponseHeaders(HEADER_INTERNED);
    }
  }
])
