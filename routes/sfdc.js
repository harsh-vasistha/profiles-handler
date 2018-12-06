var express = require('express');
var router = express.Router();
var connection = require('../sfdc-connection/connection')
var profiles = require('../sfdc-connection/profiles')
var permissions = require('../sfdc-connection/fls_permissions')
var version = "44.0";

router.post('/login', function (req, res, next) {
  var body = req.body;
  body.version = version;
  var login = connection.login(body);
  login.then((resp) => {
    res.send(resp);
  });
  login.catch((resp) => {
    res.send(resp);
  });
});

router.post('/profiles', function (req, res, next) {
  var body = req.body;
  body.version = version;
  var profilesPromise = profiles.getProfiles(body);
  profilesPromise.then((resp) => {
    res.send(resp);
  });
  profilesPromise.catch((resp) => {
    res.send(resp);
  });
});

router.post('/flspermissions', function (req, res, next) {
  var body = req.body;
  body.version = version;
  var permissionsPromise = permissions.getFlsPermissions(body);
  permissionsPromise.then((resp) => {
    res.send(resp);
  });
  permissionsPromise.catch((resp) => {
    res.send(resp);
  });
});

module.exports = router;
