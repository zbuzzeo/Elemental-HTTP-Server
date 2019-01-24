'use strict';

const http = require('http');
const fs = require('fs');

const getHandler = (req, res) => {
  // console.log(req.method, req.url, req.httpVersion);
  
  if (req.url === '/' || req.url === '/index.html') {
    fs.readFile('./public/index.html', 'utf8', (err, data) => {

      res.write(data);
      res.end();
    });
  } else {
    fs.readFile(`./public/${req.url.slice(1)}`, 'utf8', (err, data) => {

      if (err) {
        fs.readFile('./public/404.html', 'utf8', (err, data) => {

          res.write(data);
          res.end();
        });
      } else {
        res.write(data);
        res.end();
      }
    });
  }
};

module.exports = getHandler;