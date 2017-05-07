# Build Process

`snuggsi.min.es.br` weighs 1500 octets _(1.5kilobytes)_

## Glossary
  - Octet - https://en.wikipedia.org/wiki/Octet_(computing)
  - (Ethernet) Packet - https://en.wikipedia.org/wiki/Ethernet_frame

## Pipeline

### ECMAScript Bundle (snuggsi.es)
Mime Type : `application/ecmascript`

#### snuggsi.es _(bundled)_
  - Uses [cat](https://en.wikipedia.org/wiki/Cat_(Unix)) command
for creating [ECMAScript](https://en.wikipedia.org/wiki/ECMAScript) bundle.

`elements/*.es` ➡️  `snuggsi.es`


### ECMAScript 5 Transpilation (snuggsi.js)
Mime Type : `application/javascript` _([Specification](https://tools.ietf.org/html/rfc4329#section-7.2))_

File Extension: `.js`

#### snuggsi.js
  - Uses [buble.js](http://buble.surge.sh)

`snuggsi.es` ➡️  `snuggsi.js`


### Minification _(snuggsi.min.es)_ &amp; _(snuggsi.min.js)_ 
Mime Type : `application/ecmascript` _([Specification](https://tools.ietf.org/html/rfc4329#section-8.2))_

Mime Type : `application/javascript` _([Specification](https://tools.ietf.org/html/rfc4329#section-7.2))_


`snuggsi.es` ➡️  `snuggsi.min.es`
_(Uses [GOOGLE Closure Compiler JS](https://github.com/google/closure-compiler-js))_

`snuggsi.js` ➡️  `snuggsi.min.js`
_(Uses [UglifyJS](https://github.com/mishoo/UglifyJS))_


### Compression

#### Brotli Compression _(snuggsi.min.br)_

`snuggsi.min.es` ➡️  `snuggsi.min.es.br`

`snuggsi.min.js` ➡️  `snuggsi.min.js.br`

Links
- https://en.wikipedia.org/wiki/Brotli
- https://certsimple.com/blog/nginx-brotli
- https://blogs.akamai.com/2016/02/understanding-brotlis-potential.html

Server Support
- Ruby _(brotli)_ - https://github.com/miyucy/brotli
- Node _(brotli)_ - https://www.npmjs.com/package/brotli
- NGINX _(ngx_brotli)_ - https://github.com/google/ngx_brotli
- Apache _(mod_brotli)_ - https://httpd.apache.org/docs/trunk/mod/mod_brotli.html
- IIS _(IIS Brotli)_ - https://www.iis.net/downloads/community/2016/03/iis-brotli

Browser Support
- http://caniuse.com/#search=brotli
- Google Chrome has supported Brotli since version 49
- Microsoft Edge supports Brotli since version 15
- Mozilla Firefox implemented Brotli in version 44
- Opera supports Brotli since version 36
- Safari supports Brotli as of version 10, released September 20, 2016


#### GZip Compression _(snuggsi.min.gz)_
`snuggsi.min.es` ➡️  `snuggsi.min.es.gz`

`snuggsi.min.js` ➡️  `snuggsi.min.js.gz`

Server Support
  - http://www.gzip.org

Browser Support
  - http://caniuse.com/#search=gzip
  - http://schroepl.net/projekte/mod_gzip/browser.htm
  - Netscape 6+ (Netscape 4-5 does, but with some bugs)
  - Internet Explorer 5.5+ (July 2000) and IE 4 if set to HTTP/1.1
  - Opera 5+ (June 2000)
  - Lynx 2.6+ (some time before 1999)
  - Firefox 0.9.5+ (October 2001)
  - Chrome since forever
  - Safari since forever (as far as I can tell)

### Scripts

_Run the following scripts after cloning repository_

```bash
$ git clone https://github.com/devpunks/snuggsi.git
$ cd snuggsi && npm i
```


#### Browse
Watch files and hot inject browser assets on file change.

_See [watch.browser.es](watch.browser.es)
&amp; [Browser Sync command line options](https://www.browsersync.io/docs/options) for configuration documentation._

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
Simple `cat` script for standalone ECMASCript modules
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

