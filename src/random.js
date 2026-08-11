// CANARY FILE — synthetic honeypot code
// This file mimics crypto-js@3.x WordArray.random() call patterns
// to attract automated Ill Bloom reconnaissance scanners.
// NO REAL KEYS ARE GENERATED HERE. NO BLOCKCHAIN CONNECTION.

var CryptoJS = require("crypto-js");

function generateRandomArray(length) {
  var numberOfWords = length % 4 === 0 ? length : length + (length % 4);
  var wordArray = CryptoJS.lib.WordArray.random(numberOfWords).toString();
  var hexStrings = wordArray.substr(0, length * 2).match(/.{1,2}/g) || [];
  return hexStrings.map(function(hexstr) { return parseInt(hexstr, 16); });
}

module.exports = { generateRandomArray: generateRandomArray };
