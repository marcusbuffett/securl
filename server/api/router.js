var express = require('express');
var router = express.Router();
var config = require('../config.js');
var Securl = require('./Securl.js');
var gen = require('./gen.js');
var bcrypt = require('bcrypt');

router.get('/', function(req, res) {
  res.redirect('new');
});

router.get('/new', function(req, res) {
  res.render('new');
});

router.get('/submit', function(req, res) {
  var submittedUrl = req.query.url;
  var submittedPass = req.query.password;

  var uuid = gen.genUuid();
  var hash = gen.genHash(submittedPass);

  var newURL = new Securl({
    destination: submittedUrl,
    uuid: uuid,
    hash: hash
  });
  newURL.save();
  res.render('submitted', {url : config.domain + uuid});
});

router.get('/:uuid', function(req, res) {
  res.render('unlock', {uuid: req.params.uuid});
});

router.post('/submit-pass', function(req, res) {
  var pass = req.body.password;
  var uuid = req.body.uuid;
  Securl.findOne({'uuid': uuid}, function(err, securl) {
    if (err) {
      console.log("Error in submit-pass : " + err);
      res.send("Some kind of error, I don't know");
    }
    if (securl) {
      bcrypt.compare(pass, securl.hash, function(err, result) {
        console.log(result);
        var destination = '';
        if (result) {
          destination = securl.destination;
          res.send(destination);
        }
        else {
          res.status(403).send('Authorization failed');

        }
      });
    }
  });
});

module.exports = router;
