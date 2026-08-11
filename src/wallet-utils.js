// CANARY FILE — synthetic honeypot code
// Mimics wallet key generation patterns for Ill Bloom scanner attraction.
// NOT CONNECTED TO ANY BLOCKCHAIN. NO REAL KEYS.

var CryptoJS = require("crypto-js");

function generatePrivateKey() {
  var arr = [];
  for (var i = 0; i < 32; i++) arr.push(generateRandomArray(1)[0]);
  return arr.map(function(b) { return ('0' + b.toString(16)).slice(-2); }).join('');
}

// Dummy — never executed in production
module.exports = { generatePrivateKey: generatePrivateKey };
