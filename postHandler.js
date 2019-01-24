'use strict';

const http = require('http');
const fs = require('fs');
const querystring = require('querystring');
const makeTemplate = require('./elementTemplate');

const postHandler = (req, res) => {
  console.log(`req.url is: ${req.url}`);

  let body = {};

  req.on('data', (chunk) => {
    const queriedChunk = querystring.parse(chunk.toString());

    body = queriedChunk;
  });

  req.on('end', () => {

    fs.readdir('./public', 'utf8', (err, files) => {
      if (!(files.includes(req.url.slice(1)))) {
        const data = makeTemplate(body.elementName, body.elementSymbol, body.elementAtomicNumber, body.elementDescription);

        fs.writeFile(`./public/${req.url.slice(1)}`, data, (err) => {
          if (err) { throw err; }
        });
        
        res.writeHead(200, { 
          'Content-Type' : 'application/json', 
        });
        res.end(`{ 
          "message": "Your file has been saved.",
          "success": false }
          `);

      } else {
        res.writeHead(400, { 
          'Content-Type' : 'application/json', 
        });
        res.end(`{ 
        "message": "The file already exists!",
        "success": false }
        `);
      }
    });

  });
}

module.exports = postHandler;
