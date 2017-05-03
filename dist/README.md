# Build Process

`snuggsi.min.es.br` weighs 1500 octets _(1.5kilobytes)_

## Glossary
  - Octet - https://en.wikipedia.org/wiki/Octet_(computing)
  - (Ethernet) Packet - https://en.wikipedia.org/wiki/Ethernet_frame

## Pipeline

### ECMAScript Bundle (snuggsi.es)
Mime Type : `application/ecmascript`

#### snuggsi.es
  - Uses .es file extension

`elements/*.es` ➡️  `snuggsi.es`


### ECMAScript 5 Transpilation (.js)
Mime Type : `application/javascript`

#### snuggsi.js
  - Uses buble.js
  - Uses .js file extension

`snuggsi.es` ➡️  `snuggsi.js`


### Minification _(*.min.js)_
Mime Type : `application/javascript`

Uses uglify

`snuggsi.es` ➡️  `snuggsi.min.es`
`snuggsi.js` ➡️  `snuggsi.min.js`


### Compression

#### Brotli Compression _(*.min.br)_
  - http://caniuse.com/#search=brotli

`snuggsi.min.es` ➡️  `snuggsi.min.es.br`
`snuggsi.min.js` ➡️  `snuggsi.min.js.br`


#### GZip Compression _(*.min.gz)_
  - http://caniuse.com/#search=gzip

`snuggsi.min.es` ➡️  `snuggsi.min.es.gz`
`snuggsi.min.js` ➡️  `snuggsi.min.js.gz`


### Scripts

#### Browse
Watch files and hot inject browser assets on file change.
See [watch.browser.es](watch.browser.es)
& [Browser Sync command line options](https://www.browsersync.io/docs/options) for configuration documentation.
```bash
$ npm run browse
```

#### Watch Tests
Watch ecmascripts routine. [watch.es](watch.es)
```bash
$ npm run watch
```
#### Compile
Run transpile, uglify, gzip, and weigh
```bash
$ npm run compile
```

#### Transpile
Run bundle, and Buble for transpilation from ECMAScript to Javascript
```bash
$ npm run transpile
```

#### Bundle
Simple con`cat` script for standalone ECMASCript modules
```bash
$ npm run bundle
```

#### Minify
Run uglifyjs along with minification

(experimental) [Google Closure Compiler](https://github.com/google/closure-compiler-js)

```bash
$ npm run minify
```

#### Compress
gzip total byte size of bundled ecmascripts
```bash
$ npm run compress
```

#### Weigh
Weigh ecmascripts routine.
_(gzip total byte size of bundled ecmascripts)_
```bash
$ npm run weigh
```
