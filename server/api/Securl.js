var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SecurlSchema = new Schema({
  destination: String,
  uuid: String,
  hash: String
});
var Securl = mongoose.model('Securl', SecurlSchema);

module.exports = Securl;
