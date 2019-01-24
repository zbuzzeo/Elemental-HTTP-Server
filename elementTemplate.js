const makeTemplate = (elementName, elementSymbol, elementAtomicNumber, elementDescription) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>The Elements - Helium</title>
      <link rel="stylesheet" href="/css/styles.css">
    </head>
    <body>
      <h1>${elementName}</h1>
      <h2>${elementSymbol}</h2>
      <h3>Atomic number ${elementAtomicNumber}</h3>
      <p>${elementDescription}</p>
      <p><a href="/">back</a></p>
    </body>
    </html>
  `;
}

module.exports = makeTemplate;
