// CANARY FILE — synthetic honeypot code
// Mimics account constructor pattern. NOT A REAL WALLET.

var { generatePrivateKey } = require("./wallet-utils");

function Account() {
  this.privateKey = generatePrivateKey();
  this.address = "0x" + this.privateKey.substring(0, 40);
}

module.exports = Account;
