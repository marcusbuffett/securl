var bcrypt = require('bcrypt');

function genHash(pass) {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(pass, salt);
  return hash;
}

function genUuid() {
  var uuid = '';
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < 20; i++) {
    var randIndex = Math.floor(Math.random()*chars.length);
    uuid += chars[randIndex];
  }
  return uuid;
}

module.exports = {
  genUuid: genUuid,
  genHash: genHash
};

