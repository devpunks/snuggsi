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
`snuggsi.min.es` ➡️  `snuggsi.min.es.br`
`snuggsi.min.js` ➡️  `snuggsi.min.js.br`

Server Support
  - http://caniuse.com/#search=brotli
  - NGINX _(ngx_brotli)_ - https://github.com/google/ngx_brotli
  - Apache _(mod_brotli)_ - https://httpd.apache.org/docs/trunk/mod/mod_brotli.html
  - IIS _(IIS Brotli)_ - https://www.iis.net/downloads/community/2016/03/iis-brotli
  - https://en.wikipedia.org/wiki/Brotli

Browser Support
  - Google Chrome has supported Brotli since version 49
  - Microsoft Edge supports Brotli since version 15
  - Mozilla Firefox implemented Brotli in version 44
  - Opera supports Brotli since version 36
  - Safari supports Brotli as of version 10, released September 20, 2016


#### GZip Compression _(*.min.gz)_
  - http://caniuse.com/#search=gzip

`snuggsi.min.es` ➡️  `snuggsi.min.es.gz`
`snuggsi.min.js` ➡️  `snuggsi.min.js.gz`

Server Support
  - http://www.gzip.org

Browser Support
  - Netscape 6+ (Netscape 4-5 does, but with some bugs)
  - Internet Explorer 5.5+ (July 2000) and IE 4 if set to HTTP/1.1
  - Opera 5+ (June 2000)
  - Lynx 2.6+ (some time before 1999)
  - Firefox 0.9.5+ (October 2001)
  - Chrome since forever
  - Safari since forever (as far as I can tell)

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
