/**
 * TODO give desc
 */

'use strict'

/**
 * Dependencies
 */

const json5 = require('json5')
const http = require('http')
const https = require('https')

/**
 * Test if a given string represents a url of http or https protocol
 */

function testUrl(text) {
  return /^https?:\/\/.*$/.test(text)
}

/**
 * Test if a given string represents a MIME that may contain json
 */

function testContentType(text) {
  return /^(application|text)\/((x-)?json5?|(x-)?javascript|plain)$/.test(text)
}

/**
 * Try to download a json file from a url
 */

function testUrlJson(url, callback, callbackFail) {
  
  let handle = function(res) {
    res.setEncoding('utf8');

    // test contentType to avoid downloading huge files by mistake
    if (res.statusCode !== 200 || !testContentType(res.headers['content-type'])) {
      callbackFail()

      // stop the response
      res.destroy()
      return
    }

    var data = '';
    res.on('data', (chunk) => data += chunk);

    res.on('end', function() {
      try {
        callback(data);
      } catch (e) {
        callbackFail();
      }
    });
  }
  
  // protocol detection
  try {
    if (/^https/.test(url)) {
      https.get(url, handle).on('error', (e) => callbackFail());
    } else if (/^http/.test(url)) {
      http.get(url, handle).on('error', (e) => callbackFail());
    } else {
      callbackFail();
    }
  } catch (e) {
    callbackFail();
  }
}

/**
 * Exports
 */

module.exports = {
  testUrl,
  testUrlJson
}
