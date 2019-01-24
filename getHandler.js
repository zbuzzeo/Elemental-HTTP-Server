'use strict';

const http = require('http');
const fs = require('fs');

const getHandler = (req, res) => {
  // console.log(req.method, req.url, req.httpVersion);
  const checkInput = (path) => { 
    if (req.url === '/') {
      req.url = '/index.html';
    }

    console.log(`req.url is: ${req.url}\n`);

    fs.readdir(path, (err, files) => {
      if (!(files.includes(req.url.slice(1)))) {
        console.log('HIT');

        console.log(`ERROR IS: ${err}`);

        // res.write('Invalid request URL');
        // res.end();

        // fs.readFile('./public/404.html', 'utf8', (err, data) => {
        //   console.log(`ERROR IS: ${err}`);

        //   console.log('FILE READ');
        //   console.log(data);
        //   res.write(data);
        //   res.end();
        // });
      }
    });

  }

  checkInput('./public');
  
  if (req.url === '/' || req.url === '/index.html') {
    fs.readFile('./public/index.html', 'utf8', (err, data) => {

      res.write(data);
      res.end();
    });
  } else {
    fs.readFile(`./public/${req.url.slice(1)}`, 'utf8', (err, data) => {

      res.write(data);
      res.end();
    });
  }
};

module.exports = getHandler;