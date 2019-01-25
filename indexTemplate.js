'use strict';

const http = require('http');
const fs = require('fs');
const querystring = require('querystring');

const makeIndex = (path, elementName) => {
  let countElements = 0;

  fs.readdir('./public', 'utf8', (err, files) => {
    const elementFiles = files
      .filter(file => {
        return file.search('.html') !== -1;
      })
      .filter(file => {
        return file !== 'index.html' && file !== '404.html';
      });

    countElements = elementFiles.length;

    let indexHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>The Elements</title>
        <link rel="stylesheet" href="/css/styles.css">
      </head>
      <body>
        <h1>The Elements</h1>
        <h2>These are all of the known elements.</h2>
        <h3>These are ${countElements} of them:</h3>
        <ol>
    `;

    let indexHTMLClosed = `
      </ol>
      </body>
      </html>
    `;

    const filesToHTML = elementFiles.map(file => {
      const updateInnerHTML = file.slice(1, -5);
      const pageFormat = `
      <li>
        <a href="/${file}">${file.charAt(0).toUpperCase() + updateInnerHTML}</a>
      </li>`;
      
      // concatenate this page format to the HTML
      indexHTML += pageFormat;
    });

    indexHTML += indexHTMLClosed;

    fs.writeFile('./public/index.html', indexHTML, (err) => {
      if (err) { throw err; }
  
      console.log('HIT');
      console.log(indexHTML);
    });

    return indexHTML;
  });
}

module.exports = makeIndex;
