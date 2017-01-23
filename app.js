/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
var bodyParser = require('body-parser');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();
app.use(bodyParser.json());

app.get('/get', function (req, res) {
  res.send({string01: 'string01!'});
});
app.post('/post', function (req, res) {
  var ret = {};
  for (var key in req.body) {
    if (typeof req.body[key] == 'string') {
      ret[key] = req.body[key] + '!';
    } else {
      ret[key] = req.body[key];
    }
  }
  res.send(ret);
});

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function () {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
  console.log("5!");
});
