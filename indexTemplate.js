'use strict';

const fs = require('fs');

const updateIndex = (path, elementName) => {
  // narrow down file directory to element .html files only
  fs.readdir('./public', 'utf8', (err, files) => {
    const elementFiles = files
      .filter(file => {
        return file.search('.html') !== -1;
      })
      .filter(file => {
        return file !== 'index.html' && file !== '404.html';
      });

    let countElements = elementFiles.length;

    // break up the HTML to insert new elements with ease
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

    // embed basic element information within li and anchor tags and append them to the HTML
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

    // take the modified index.html and overwrite the old one
    fs.writeFile('./public/index.html', indexHTML, (err) => {
      if (err) { throw err; }
  
      console.log('HIT');
      console.log(indexHTML);
    });

    return indexHTML;
  });
}

module.exports = updateIndex;
