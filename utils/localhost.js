'use strict';
const https = require('https');
const http = require('http');
const fs = require('fs');

const sslkey = fs.readFileSync('ssl-key.pem');
const sslcert = fs.readFileSync('ssl-cert.pem')

const options = {
  key: sslkey,
  cert: sslcert

};

const httpsRedirect = (req, res) => {
  res.writeHead(301, { 'Location': `https://localhost:${process.env.HTTPS_PORT}` + req.url });
  res.end();
};


module.exports = (app, httpsPort, httpPort) => {
  https.createServer(options, app).listen(httpsPort);
  http.createServer(httpsRedirect).listen(httpPort);
};
