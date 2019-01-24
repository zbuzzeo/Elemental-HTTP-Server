'use strict';

const http = require('http');
const fs = require('fs');

const getHandler = require('./getHandler');
const postHandler = require('./postHandler');

const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  console.log(req.method, req.url, req.httpVersion);

  switch(req.method) {
    case 'GET':
      getHandler(req, res);
      break;
    case 'POST':
      postHandler(req, res);
      break;
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`); 
});
