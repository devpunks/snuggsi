# `bin` Scripts

_Run the following scripts after cloning repository_

```bash
$ git clone https://github.com/devpunks/snuggsi.git
$ cd snuggsi && npm i
```


## Browse
Watch files and hot inject browser assets on file change.

_See [bin/browse](bin/browse)
&amp; [Browser Sync command line options](https://www.browsersync.io/docs/options) for configuration documentation._

```bash
$ bin/browse
```


## Test Runner

Uses
[`tape`](https://github.com/substack/tape)
and
[`tap-nyc`](https://github.com/MegaArman/tap-nyc)
and

_See [bin/test](bin/test)_

```bash
$ bin/test
```


## Code Coverage

Uses
[`nyc`](https://github.com/istanbuljs/nyc)
_See [bin/cover](bin/cover)_

```bash
$ bin/cover
```


## Watch Changes
Watch ecmascripts routine.

_See [bin/watch](bin/watch)_

```bash
$ bin/watch
```


## Compile
Run transpile, uglify, gzip, and weigh

_See [bin/watch](bin/watch)_

```bash
$ bin/compile
```


## Transpile

_See [bin/transpile](bin/transpile)_

Run bundle, and Buble for transpilation from ECMAScript to Javascript
```bash
$ bin/transpile
```


## Bundle

_See [bin/bundle](bin/bundle)_

Simple `cat` script for standalone ECMASCript modules
```bash
$ bin/bundle
```


## Shrink

_See [bin/shrink](bin/shrink)_

Run `uglify-js` and `uglify-es` along with minification


```bash
$ bin/shrink
```


## Compress

_See [bin/compress](bin/compress)_

gzip total byte size of bundled ecmascripts
```bash
$ bin/compress
```


## Weigh

_See [bin/weigh](bin/weigh)_

Weigh ecmascripts routine.
_(gzip total byte size of bundled ecmascripts)_
```bash
$ bin/weigh
```
