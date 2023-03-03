import { r as registerInstance, e as createEvent, g as getElement } from './index-02ce58e9.js';

class HttpService {
  constructor(ctx) {
    this.ctx = ctx;
    this.notFound = -1;
    this.startIndex = 0;
    this.settingOffset = 2;
    this.clientError = 400;
    this.unAuthorizedError = 401;
  }
  async fetch(endpoint) {
    try {
      this.ctx.page.sendMessage({ type: "START_LOADING" });
      const response = await fetch(this.resolveSetting(endpoint.url), this.getConfig(endpoint));
      if (response.status >= this.clientError) {
        const error = await response.json();
        if (response.status >= this.unAuthorizedError)
          this.ctx.page.sendMessage({ type: "UN_AUTHORIZED", metadata: { endpoint, error } });
        throw {
          code: response.status,
          message: response.statusText,
          error: error
        };
      }
      return await response.json();
    }
    finally {
      setTimeout(() => this.ctx.page.sendMessage({ type: "END_LOADING" }));
    }
  }
  getConfig(endpoint) {
    const config = {
      method: endpoint.method,
      mode: 'cors',
      headers: Object.apply({ "Content-Type": "application/json" }, endpoint.headers),
      redirect: 'follow',
      referrer: 'no-referrer',
      body: endpoint.body !== null ? JSON.stringify(endpoint.body) : null
    };
    return config;
  }
  resolveSetting(val, counter = this.startIndex) {
    if (counter > this.settingOffset)
      return val;
    const matches = val.match(/\[[\w|_]+\]/g);
    if (matches === null)
      return val;
    let result = matches.reduce(this.replace.bind(this), val);
    if (result.indexOf('[') > this.notFound)
      result = this.resolveSetting(result, counter + 1);
    return result;
  }
  replace(prev, next) {
    let replacement = this.ctx.config.getSetting(next);
    if (replacement !== null && replacement.indexOf('[SELF]') > this.notFound)
      return replacement.replace('[SELF]', prev.replace(next, ''));
    return prev.replace(next, replacement);
  }
}

function currencyFormat(value, [locale, currency]) {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  });
  return formatter.format(+value);
}

class PipeFactory {
  constructor() {
    this.currencyFormat = currencyFormat;
  }
}

// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

const REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

function validate(uuid) {
  return typeof uuid === 'string' && REGEX.test(uuid);
}

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}

function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}

function stringify(arr, offset = 0) {
  const uuid = unsafeStringify(arr, offset); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!validate(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

let _nodeId;

let _clockseq; // Previous uuid creation time


let _lastMSecs = 0;
let _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

function v1(options, buf, offset) {
  let i = buf && offset || 0;
  const b = buf || new Array(16);
  options = options || {};
  let node = options.node || _nodeId;
  let clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189

  if (node == null || clockseq == null) {
    const seedBytes = options.random || (options.rng || rng)();

    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }

    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.


  let msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock

  let nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

  const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval


  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  } // Per 4.2.1.2 Throw error if too many uuids are requested


  if (nsecs >= 10000) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

  msecs += 12219292800000; // `time_low`

  const tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff; // `time_mid`

  const tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff; // `time_high_and_version`

  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

  b[i++] = clockseq & 0xff; // `node`

  for (let n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf || unsafeStringify(b);
}

function parse(uuid) {
  if (!validate(uuid)) {
    throw TypeError('Invalid UUID');
  }

  let v;
  const arr = new Uint8Array(16); // Parse ########-....-....-....-............

  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 0xff;
  arr[2] = v >>> 8 & 0xff;
  arr[3] = v & 0xff; // Parse ........-####-....-....-............

  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 0xff; // Parse ........-....-####-....-............

  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 0xff; // Parse ........-....-....-####-............

  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 0xff; // Parse ........-....-....-....-############
  // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)

  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
  arr[11] = v / 0x100000000 & 0xff;
  arr[12] = v >>> 24 & 0xff;
  arr[13] = v >>> 16 & 0xff;
  arr[14] = v >>> 8 & 0xff;
  arr[15] = v & 0xff;
  return arr;
}

function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  const bytes = [];

  for (let i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }

  return bytes;
}

const DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
const URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
function v35(name, version, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    var _namespace;

    if (typeof value === 'string') {
      value = stringToBytes(value);
    }

    if (typeof namespace === 'string') {
      namespace = parse(namespace);
    }

    if (((_namespace = namespace) === null || _namespace === void 0 ? void 0 : _namespace.length) !== 16) {
      throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
    } // Compute hash of namespace and value, Per 4.3
    // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
    // hashfunc([...namespace, ... value])`


    let bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 0x0f | version;
    bytes[8] = bytes[8] & 0x3f | 0x80;

    if (buf) {
      offset = offset || 0;

      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }

      return buf;
    }

    return unsafeStringify(bytes);
  } // Function#name is not settable on some platforms (#270)


  try {
    generateUUID.name = name; // eslint-disable-next-line no-empty
  } catch (err) {} // For CommonJS default export support


  generateUUID.DNS = DNS;
  generateUUID.URL = URL;
  return generateUUID;
}

/*
 * Browser-compatible JavaScript MD5
 *
 * Modification of JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
function md5(bytes) {
  if (typeof bytes === 'string') {
    const msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = new Uint8Array(msg.length);

    for (let i = 0; i < msg.length; ++i) {
      bytes[i] = msg.charCodeAt(i);
    }
  }

  return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
}
/*
 * Convert an array of little-endian words to an array of bytes
 */


function md5ToHexEncodedArray(input) {
  const output = [];
  const length32 = input.length * 32;
  const hexTab = '0123456789abcdef';

  for (let i = 0; i < length32; i += 8) {
    const x = input[i >> 5] >>> i % 32 & 0xff;
    const hex = parseInt(hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f), 16);
    output.push(hex);
  }

  return output;
}
/**
 * Calculate output length with padding and bit length
 */


function getOutputLength(inputLength8) {
  return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */


function wordsToMd5(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << len % 32;
  x[getOutputLength(len) - 1] = len;
  let a = 1732584193;
  let b = -271733879;
  let c = -1732584194;
  let d = 271733878;

  for (let i = 0; i < x.length; i += 16) {
    const olda = a;
    const oldb = b;
    const oldc = c;
    const oldd = d;
    a = md5ff(a, b, c, d, x[i], 7, -680876936);
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x[i], 20, -373897302);
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x[i], 11, -358537222);
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5ii(a, b, c, d, x[i], 6, -198630844);
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }

  return [a, b, c, d];
}
/*
 * Convert an array bytes to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */


function bytesToWords(input) {
  if (input.length === 0) {
    return [];
  }

  const length8 = input.length * 8;
  const output = new Uint32Array(getOutputLength(length8));

  for (let i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input[i / 8] & 0xff) << i % 32;
  }

  return output;
}
/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */


function safeAdd(x, y) {
  const lsw = (x & 0xffff) + (y & 0xffff);
  const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xffff;
}
/*
 * Bitwise rotate a 32-bit number to the left.
 */


function bitRotateLeft(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
/*
 * These functions implement the four basic operations the algorithm uses.
 */


function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}

function md5ff(a, b, c, d, x, s, t) {
  return md5cmn(b & c | ~b & d, a, b, x, s, t);
}

function md5gg(a, b, c, d, x, s, t) {
  return md5cmn(b & d | c & ~d, a, b, x, s, t);
}

function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t);
}

function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}

const v3 = v35('v3', 0x30, md5);

const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
const native = {
  randomUUID
};

function v4(options, buf, offset) {
  if (native.randomUUID && !buf && !options) {
    return native.randomUUID();
  }

  options = options || {};
  const rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return unsafeStringify(rnds);
}

// Adapted from Chris Veness' SHA1 code at
// http://www.movable-type.co.uk/scripts/sha1.html
function f(s, x, y, z) {
  switch (s) {
    case 0:
      return x & y ^ ~x & z;

    case 1:
      return x ^ y ^ z;

    case 2:
      return x & y ^ x & z ^ y & z;

    case 3:
      return x ^ y ^ z;
  }
}

function ROTL(x, n) {
  return x << n | x >>> 32 - n;
}

function sha1(bytes) {
  const K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
  const H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];

  if (typeof bytes === 'string') {
    const msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = [];

    for (let i = 0; i < msg.length; ++i) {
      bytes.push(msg.charCodeAt(i));
    }
  } else if (!Array.isArray(bytes)) {
    // Convert Array-like to Array
    bytes = Array.prototype.slice.call(bytes);
  }

  bytes.push(0x80);
  const l = bytes.length / 4 + 2;
  const N = Math.ceil(l / 16);
  const M = new Array(N);

  for (let i = 0; i < N; ++i) {
    const arr = new Uint32Array(16);

    for (let j = 0; j < 16; ++j) {
      arr[j] = bytes[i * 64 + j * 4] << 24 | bytes[i * 64 + j * 4 + 1] << 16 | bytes[i * 64 + j * 4 + 2] << 8 | bytes[i * 64 + j * 4 + 3];
    }

    M[i] = arr;
  }

  M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
  M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = (bytes.length - 1) * 8 & 0xffffffff;

  for (let i = 0; i < N; ++i) {
    const W = new Uint32Array(80);

    for (let t = 0; t < 16; ++t) {
      W[t] = M[i][t];
    }

    for (let t = 16; t < 80; ++t) {
      W[t] = ROTL(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);
    }

    let a = H[0];
    let b = H[1];
    let c = H[2];
    let d = H[3];
    let e = H[4];

    for (let t = 0; t < 80; ++t) {
      const s = Math.floor(t / 20);
      const T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[t] >>> 0;
      e = d;
      d = c;
      c = ROTL(b, 30) >>> 0;
      b = a;
      a = T;
    }

    H[0] = H[0] + a >>> 0;
    H[1] = H[1] + b >>> 0;
    H[2] = H[2] + c >>> 0;
    H[3] = H[3] + d >>> 0;
    H[4] = H[4] + e >>> 0;
  }

  return [H[0] >> 24 & 0xff, H[0] >> 16 & 0xff, H[0] >> 8 & 0xff, H[0] & 0xff, H[1] >> 24 & 0xff, H[1] >> 16 & 0xff, H[1] >> 8 & 0xff, H[1] & 0xff, H[2] >> 24 & 0xff, H[2] >> 16 & 0xff, H[2] >> 8 & 0xff, H[2] & 0xff, H[3] >> 24 & 0xff, H[3] >> 16 & 0xff, H[3] >> 8 & 0xff, H[3] & 0xff, H[4] >> 24 & 0xff, H[4] >> 16 & 0xff, H[4] >> 8 & 0xff, H[4] & 0xff];
}

const v5 = v35('v5', 0x50, sha1);

const nil = '00000000-0000-0000-0000-000000000000';

function version(uuid) {
  if (!validate(uuid)) {
    throw TypeError('Invalid UUID');
  }

  return parseInt(uuid.slice(14, 15), 16);
}

class ModelService {
  constructor(config) {
    this.config = config;
    this.model = {};
    this.sessionId = v4().replaceAll('-', 'R');
    this.pipes = new PipeFactory();
  }
  getValue(key, model = this.model) {
    if (key.indexOf('[') === 0 || key.indexOf(']') === key.length - 1)
      return this.config.getSetting(key);
    const val = key.split(".").reduce((total, currentElement) => total != null ? total[currentElement] : undefined, { ...model });
    if (key.match(/([a-z|A-Z]+\.[a-z|A-Z]+)+/g) === null && val === undefined)
      return key;
    return val;
  }
  getInterpolatedValue(value) {
    if (value === undefined || value === null)
      return value;
    const myRegexp = /\{\{\[*(?:(\w|\.|\||-)+)\]*\}\}/g;
    const match = value.match(myRegexp);
    if (match === null || match.length === 0)
      return value;
    return match.reduce((prev, curr) => this.replaceAll(prev, curr), value);
  }
  setValue(key, val) {
    if (key.indexOf('[') === 0 || key.indexOf(']') === key.length - 1)
      this.config.addSetting(key, val);
    else
      this.model = this.merge(this.model, key, val);
  }
  save() {
    sessionStorage.setItem(this.sessionId, JSON.stringify(this.model));
  }
  load() {
    const value = sessionStorage.getItem(this.sessionId);
    this.clearCache();
    if (value === null)
      return;
    this.model = JSON.parse(value);
  }
  clearCache() {
    sessionStorage.clear();
  }
  merge(model, name, value) {
    if (name === null)
      return;
    let newModel = { ...model };
    name
      .split(".")
      .reduce((total, current, index, arr) => {
      total[current] = index === arr.length - 1 ? value : { ...total[current] };
      return total[current];
    }, newModel);
    return newModel;
  }
  replaceAll(value, key) {
    const padding = 2;
    const startIndex = 2;
    const firstIndex = 0;
    const secondIndex = 1;
    const expr = key.substring(padding, key.length - padding);
    const values = expr.split('|');
    const params = values.slice(startIndex);
    let newValue = this.getValue(values[firstIndex]);
    if (values != null && values.length > 1 && this.pipes[values[secondIndex]] != null)
      newValue = this.pipes[values[secondIndex]](newValue, params);
    return value.replace(key, newValue);
  }
}

class ConfigService {
  constructor() {
    this.settings = {};
  }
  getSetting(key) {
    return this.settings[key];
  }
  addSetting(key, setting) {
    if (key.indexOf('[') === -1)
      key = `[${key}]`;
    this.settings[key] = setting;
  }
}

class BaseActivity {
  gotoNext() {
    if (this.next !== undefined && this.ctx !== undefined)
      this.ctx.wf.goto(this.next);
  }
}

class RedirectActivity extends BaseActivity {
  constructor() {
    super(...arguments);
    this.name = "redirect";
    this["type"] = "redirect-activity";
  }
  async execute() {
    var _a;
    this.ctx.model.save();
    const params = `${(_a = this.ctx.wf.process) === null || _a === void 0 ? void 0 : _a.name}-${this.next}-${this.ctx.model.sessionId}`;
    window.location.href = `${this.location}?returnUrl=${params}`;
    return true;
  }
}

class FinishActivity extends BaseActivity {
  constructor() {
    super(...arguments);
    this.name = "finish";
    this["type"] = "finish-activity";
  }
  async execute() {
    if (this.ctx.wf.stack.length === 0) {
      this.gotoNext();
      return true;
    }
    const ipc = this.ctx.wf.stack.pop();
    await this.ctx.wf.setProcess(ipc.process, ipc.activity);
    return true;
  }
}

class IPCActivity extends BaseActivity {
  constructor() {
    super(...arguments);
    this.name = "ipc";
    this["type"] = "ipc-activity";
  }
  async execute() {
    if (this.process !== null && this.process.length > 0) {
      this.ctx.wf.stack.push({
        process: this.ctx.wf.process.name,
        activity: this.next
      });
      await this.ctx.wf.setProcess(this.ctx.model.getInterpolatedValue(this.process), 'start', this.next !== undefined ? false : true);
    }
    return true;
  }
}

class CodeActivity extends BaseActivity {
  constructor() {
    super(...arguments);
    this.name = "code";
    this["type"] = "code-activity";
  }
  async execute() {
    this.evaluate(this.expression, this.ctx);
    this.gotoNext();
    return true;
  }
  evaluate(expression, ctx) {
    const f = new Function('ctx', expression);
    return f(ctx);
  }
}

class PageActivity {
  constructor() {
    this.name = "start";
    this["type"] = "page-activity";
  }
  async execute() {
    this.ctx.page.controls = this.controls;
    return true;
  }
}

class NullActivity {
  constructor() {
    this.name = "undefined";
    this["type"] = "null-activity";
  }
  async execute() {
    return new Promise((_resolve, reject) => reject("NULL Activity"));
  }
}

class ApiActivity extends BaseActivity {
  constructor() {
    super(...arguments);
    this.name = "start";
    this["type"] = "api-activity";
  }
  async execute() {
    await this.callEndpoints();
    this.gotoNext();
    return true;
  }
  async callEndpoints() {
    for (const endpoint of this.endpoints) {
      endpoint.body = this.getBody(endpoint);
      await this.callEndpoint(this.ctx.http, endpoint);
    }
    return true;
  }
  async callEndpoint(http, endpoint) {
    return http.fetch(endpoint)
      .then(data => this.setModel(endpoint, data));
  }
  getBody(endpoint) {
    if (!this.hasModel() || endpoint.method.toUpperCase() === "GET" || endpoint.method.toUpperCase() === "DELETE")
      return null;
    const model = this.ctx.model;
    const mappings = endpoint.mappings;
    let body = {};
    mappings
      .filter(m => m.direction === 'out' || m.direction === 'inout')
      .forEach(m => Object.assign(body, { [m.remote]: model.getValue(m.client) }));
    return body;
  }
  setModel(endpoint, data) {
    if (!this.hasModel())
      return;
    const model = this.ctx.model;
    const mappings = endpoint.mappings;
    if (mappings === null || mappings.length === 0)
      return Object.keys(data).forEach(k => model.setValue(k, data[k]));
    mappings
      .filter(m => m.direction === 'in' || m.direction === 'inout')
      .forEach(m => model.setValue(m.client, model.getValue(m.remote, data)));
  }
  hasModel() {
    return this.ctx !== undefined
      && this.ctx !== null
      && this.ctx.model !== undefined
      && this.ctx.model !== null;
  }
}

class AssignActivity extends BaseActivity {
  constructor() {
    super(...arguments);
    this.name = "assign";
    this["type"] = "assign-activity";
  }
  async execute() {
    const value = this.ctx.model.getInterpolatedValue(this.value);
    this.ctx.model.setValue(this.key, value);
    this.gotoNext();
    return true;
  }
}

class DecisionActivity extends CodeActivity {
  constructor() {
    super(...arguments);
    this.name = "decision";
    this["type"] = "decision-activity";
  }
  async execute() {
    const exp = `return ${this.ctx.model.getInterpolatedValue(this.expression)};`;
    if (this.evaluate(exp, this.ctx))
      this.ctx.wf.goto(this.trueAction);
    else
      this.ctx.wf.goto(this.falseAction);
    return true;
  }
}

class SwitchActivity extends CodeActivity {
  constructor() {
    super(...arguments);
    this.name = "switch";
    this["type"] = "switch-activity";
  }
  async execute() {
    if (this.rules === null || this.rules === undefined)
      throw new Error(`No valid rule in ${this.name} found !!`);
    for (let rule of this.rules) {
      const expression = `return ${this.ctx.model.getInterpolatedValue(rule.expression)};`;
      if (this.evaluate(expression, this.ctx)) {
        this.gotoNext();
        return true;
      }
    }
    throw new Error(`No valid rule in ${this.name} found !!`);
  }
}

class ActivityFactory {
  static create(config, ctx) {
    if (config === null || config === undefined || config["type"] === undefined || config["type"] === null)
      return new NullActivity();
    let act = ActivityFactory.activities.find(a => a["type"] === config["type"]);
    if (act == null)
      return new NullActivity();
    return Object.assign(act, config, { ctx });
  }
  static add(activity, replace = false) {
    const notFound = -1;
    const deleteCount = 1;
    let index = ActivityFactory.activities.findIndex(a => a.type === activity.type);
    if (index > notFound && !replace)
      return;
    if (index > notFound)
      ActivityFactory.activities.splice(index, deleteCount);
    ActivityFactory.activities.push(activity);
  }
}
ActivityFactory.activities = [
  new NullActivity(),
  new PageActivity(),
  new ApiActivity(),
  new AssignActivity(),
  new CodeActivity(),
  new DecisionActivity(),
  new IPCActivity(),
  new FinishActivity(),
  new RedirectActivity(),
  new SwitchActivity()
];

class WorkflowService {
  constructor(ctx) {
    this.ctx = ctx;
    this.stack = [];
  }
  async setProcess(process, next = "start", clearStack = true) {
    try {
      if (clearStack)
        this.stack = [];
      if (typeof process === "string" && this.loader != null)
        process = await this.loader.load(process);
      if (typeof process === "string")
        return Promise.reject("Workflow not found");
      this.process = process;
      this.activity = null;
      this.goto(next);
      this.ctx.page.sendMessage({ type: "PROCESS_CHANGED", metadata: { stack: this.stack } });
    }
    catch (err) {
      if (err) {
        console.error(err);
        this.ctx.page.sendMessage({ type: "ERROR", description: err.message, metadata: err });
      }
    }
  }
  goto(name) {
    setTimeout(this.tryNext.bind(this, name));
  }
  async tryNext(name) {
    try {
      this.ctx.page.sendMessage({ type: "WORKFLOW_CHANGING" });
      await this.next(name);
      this.ctx.page.sendMessage({ type: "WORKFLOW_CHANGED" });
    }
    catch (err) {
      this.ctx.page.sendMessage({ type: "ERROR", description: err === null || err === void 0 ? void 0 : err.message, metadata: err });
    }
  }
  async next(name) {
    var _a;
    if (!this.isValidProcess())
      return null;
    if (((_a = this.ctx.wf.activity) === null || _a === void 0 ? void 0 : _a.type) === "page-activity" && !this.ctx.validator.validate(this.ctx))
      return null;
    let newActivity = this.process
      .activities
      .find(a => a.name === name);
    if (!newActivity)
      throw new Error(`Activity ${name} not found`);
    this.activity = newActivity;
    return ActivityFactory.create(this.activity, this.ctx)
      .execute();
  }
  isValidProcess() {
    return typeof this.process !== "string"
      && this.process !== undefined
      && this.process !== null
      && this.process.activities !== undefined
      && this.process.activities !== null;
  }
}

class Validator {
  constructor(name) {
    this.name = name;
  }
  setError(control, error, message) {
    control.error = error;
    control.errorMessage = error ? message : null;
    if (control.el !== null) {
      control.el.setAttribute("error", control.error === true ? "true" : "false");
      control.el.setAttribute("errorMessage", control.errorMessage);
    }
    if (control.el.nextSibling["attributes"]["wf-error"])
      control.el.nextSibling.textContent = control.errorMessage;
  }
}

class RequiredValidator extends Validator {
  validate(context, control, config) {
    const value = context.model.getValue(control.id);
    const isEmpty = value === null || value === undefined || value.length === 0;
    super.setError(control, isEmpty, config.message);
    return !isEmpty;
  }
}

class RegexValidator extends Validator {
  validate(context, control, config) {
    const value = context.model.getValue(control.id);
    const regex = new RegExp(config.expression, 'g');
    const result = regex.exec(value);
    const isValid = result != null ? true : false;
    super.setError(control, !isValid, config.message);
    return isValid;
  }
}

class RangeValidator extends Validator {
  validate(context, control, config) {
    const value = +context.model.getValue(control.id);
    const isValid = value >= config.min && value <= config.max;
    super.setError(control, !isValid, config.message);
    return isValid;
  }
}

class ValidatorService {
  constructor() {
    this.validators = [
      new RequiredValidator("required"),
      new RegexValidator("regex"),
      new RangeValidator("range")
    ];
  }
  validate(ctx) {
    if (ctx.page === undefined || ctx.page === null || ctx.page.controls === undefined || ctx.page.controls === null)
      return true;
    let isValid = true;
    for (const ctrl of ctx.page.controls)
      isValid = this.validateControl(ctx, ctrl) && isValid;
    return isValid;
  }
  addValidator(validator) {
    const val = this.validators.find(v => v.name === validator.name);
    if (!val)
      this.validators.push(validator);
  }
  validateControl(ctx, control) {
    if (control === undefined || control === null)
      return true;
    let isValid = true;
    for (const index in control.controls)
      isValid = this.validateControl(ctx, control.controls[index]) && isValid;
    if (control.validators !== null && control.validators !== undefined && control.validators.length > 0) {
      for (const config of control.validators) {
        const validator = this.validators.find(v => v.name === config.name);
        if (!validator)
          continue;
        if (!validator.validate(ctx, control, config)) {
          isValid = false;
          this.sendErrorMsg(ctx, validator, control);
          break;
        }
      }
    }
    return isValid;
  }
  sendErrorMsg(ctx, validator, control) {
    ctx.page.sendMessage({
      type: "VALIDATION_ERROR",
      description: control.errorMessage,
      metadata: {
        validator: validator.name,
        control: control.id
      }
    });
  }
}

class PageBuilder {
  constructor(ctx) {
    this.ctx = ctx;
  }
  build(parent, onInput) {
    this.onInput = onInput;
    this.clearPage(parent);
    this.ctx.controls.forEach(this.addComponent.bind(this, parent));
  }
  clearPage(parent) {
    for (let i = parent.childNodes.length - 1; i >= 0; i--)
      parent.removeChild(parent.childNodes[i]);
  }
  addComponent(parent, control) {
    let newEl;
    if (control.tag === "polaris-workflow")
      newEl = this.createWorkflowElement(control);
    else
      newEl = this.createElement(control);
    parent.appendChild(newEl);
    this.addErrorLabel(newEl);
  }
  createWorkflowElement(control) {
    const el = document.createElement(control.tag);
    const newEl = Object.assign(el, control);
    newEl.setServices(this.ctx);
    return newEl;
  }
  createElement(control) {
    var _a;
    const el = document.createElement(control.tag);
    const options = {
      "wf-Workflow": "",
      "ctx": this.ctx
    };
    const newEl = Object.assign(el, control, options);
    control.el = newEl;
    this.bind(newEl);
    this.bindCaption(newEl, control);
    (_a = control.controls) === null || _a === void 0 ? void 0 : _a.forEach(this.addComponent.bind(this, newEl));
    return newEl;
  }
  bind(newEl) {
    if (!newEl.id || newEl.value === undefined)
      return;
    const newValue = this.ctx.model.getValue(newEl.id);
    if (newValue !== undefined)
      newEl.value = newValue;
    this.ctx.model.setValue(newEl.id, newEl.value);
    newEl.oninput = this.onInput.bind(this, newEl);
  }
  bindCaption(newEl, control) {
    this.interpolate('caption', newEl, control);
    this.interpolate('textContent', newEl, control);
    this.interpolate('innerHTML', newEl, control);
  }
  interpolate(prop, newEl, control) {
    if (!newEl[prop])
      return;
    newEl[prop] = this.ctx.model.getInterpolatedValue(control[prop] || newEl[prop]);
  }
  addErrorLabel(newEl) {
    if (!newEl.validators)
      return;
    const errLabel = document.createElement("span");
    errLabel.setAttribute("wf-error", "error");
    newEl.parentNode.appendChild(errLabel);
  }
}

class HttpWorkflowLoader {
  constructor(http) {
    this.http = http;
  }
  async load(processName) {
    return this.http.fetch({ url: `[WF]/${processName}`, method: 'get' });
  }
}

const PolarisWorkflow = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.wfMessage = createEvent(this, "wfMessage", 7);
    this._components = [];
    this.parent = undefined;
    this.tag = undefined;
    this.page = this;
    this.ctx = this;
    this.value = undefined;
    this.url = undefined;
    this.process = undefined;
    this.activity = undefined;
    this.sessionId = undefined;
    console.dir(this);
    this.http = new HttpService(this.ctx);
    this.config = new ConfigService();
    this.model = new ModelService(this.ctx.config);
    this.wf = new WorkflowService(this.ctx);
    this.validator = new ValidatorService();
  }
  async processChangeHandler() {
    await this.load(this.process, this.activity, this.sessionId);
  }
  get controls() { return this._components; }
  set controls(val) {
    this._components = val;
    this._render();
  }
  async setServices(ctx) {
    this.model = ctx.model;
    this.http = ctx.http;
    this.config = ctx.config;
    this.validator = ctx.validator;
  }
  async load(process, next = "start", sessionId = '') {
    if (sessionId != null && sessionId.length > 0) {
      this.ctx.model.sessionId = sessionId;
      this.ctx.model.load();
    }
    await this.wf.setProcess(process, next);
  }
  async addActivity(activity, replace = false) {
    ActivityFactory.add(activity, replace);
    return Promise.resolve();
  }
  async addValidator(validator) {
    this.validator.addValidator(validator);
  }
  sendMessage(message) {
    var _a, _b, _c;
    const metaData = {
      process: (_a = this.wf.process) === null || _a === void 0 ? void 0 : _a.name,
      activity: (_b = this.wf.activity) === null || _b === void 0 ? void 0 : _b.name,
      activityType: (_c = this.wf.activity) === null || _c === void 0 ? void 0 : _c.type,
      timestamp: Date.now()
    };
    if (this._isConnected === true)
      this.wfMessage.emit({ ...message, ...metaData });
  }
  disconnectedCallback() {
    this._isConnected = false;
  }
  connectedCallback() {
    this._isConnected = true;
  }
  async componentWillLoad() {
    if (this.url != null) {
      this.config.addSetting("[settingsUrl]", this.url);
      const settings = await this.http.fetch({ method: "GET", url: this.url });
      Object.keys(settings).forEach(k => this.config.addSetting(k, settings[k]));
    }
    if (this._loader === null || this._loader === undefined) {
      this._loader = new HttpWorkflowLoader(this.http);
      this.wf.loader = this._loader;
    }
    if (this.parent != null)
      await this.setServices(this.parent);
    if (this.process != null)
      await this.load(this.process, this.activity, this.sessionId);
  }
  onInput(newEl) {
    this.model.setValue(newEl.id, newEl.value);
    if (newEl.hasAttribute('error'))
      this.validator.validate(this);
  }
  _render() {
    const builder = new PageBuilder(this);
    builder.build(this.el, this.onInput.bind(this));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "process": ["processChangeHandler"]
  }; }
};

export { PolarisWorkflow as polaris_workflow };

//# sourceMappingURL=polaris-workflow.entry.js.map