# Build Process

Snuggsi size is 1500 octets

## Glossary
Octet - https://en.wikipedia.org/wiki/Octet_(computing)
(Ethernet) Packet - https://en.wikipedia.org/wiki/Ethernet_frame

## ECMAScript Bundle (snuggsi.es)
Mime Type : `application/ecmascript`

### snuggsi.es
  - Uses .es file extension

`elements/*.es` ➡️  `snuggsi.es`


## ECMAScript 5 Transpilation (.js)
Mime Type : `application/javascript`

### snuggsi.js
  - Uses buble.js
  - Uses .js file extension

`snuggsi.es` ➡️  `snuggsi.js`


## Minification _(*.min.js)_
Mime Type : `application/javascript`

Uses uglify

`snuggsi.es` ➡️  `snuggsi.min.es`
`snuggsi.js` ➡️  `snuggsi.min.js`


## GZip Compression _(classic)_ _(*.min.gz)_
  - http://caniuse.com/#search=gzip

`snuggsi.min.es` ➡️  `snuggsi.min.es.gz`
`snuggsi.min.js` ➡️  `snuggsi.min.js.gz`


## Brotli compression _(*.min.br)_
  - http://caniuse.com/#search=brotli

`snuggsi.min.es` ➡️  `snuggsi.min.es.br`
`snuggsi.min.js` ➡️  `snuggsi.min.js.br`


