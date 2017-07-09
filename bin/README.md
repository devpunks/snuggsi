# `bin` Scripts

_Run the following scripts after cloning repository_

```bash
$ git clone https://github.com/devpunks/snuggsi.git
$ cd snuggsi && npm i
```


## Crank
Runs the following build process

  0. [`compile`](#compile)
  1. [`distribute`](#distribute)
  2. [`deploy`](#deploy)

_See [bin/crank](crank)_
```bash
$ bin/crank
```


## Browse
Watch files and hot inject browser assets on file change.

_See [bin/browse](browse)
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

_See [bin/test](test)_

```bash
$ bin/test
```


## Code Coverage

Uses
[`nyc`](https://github.com/istanbuljs/nyc)
_See [bin/cover](cover)_

```bash
$ bin/cover
```


## Watch Changes
Watch ecmascripts routine.

_See [bin/watch](watch)_

```bash
$ bin/watch
```


## Compile
Run transpile, uglify, gzip, and weigh

_See [bin/compile](compile)_

```bash
$ bin/compile
```


## Transpile

_See [bin/transpile](transpile)_

Run bundle, and Buble for transpilation from ECMAScript to Javascript
```bash
$ bin/transpile
```


## Bundle

_See [bin/bundle](bundle)_

Simple `cat` script for standalone ECMASCript modules
```bash
$ bin/bundle
```


## Shrink

_See [bin/shrink](shrink)_

Run `uglify-js` and `uglify-es` along with minification


```bash
$ bin/shrink
```


## Compress

_See [bin/compress](compress)_

gzip total byte size of bundled ecmascripts
```bash
$ bin/compress
```


## Weigh

_See [bin/weigh](weigh)_

Weigh ecmascripts routine.
_(gzip total byte size of bundled ecmascripts)_
```bash
$ bin/weigh
```


## Validate Weight

_See [bin/validate-weight](validate-weight)_

Validate that `snuggsi.min.es.br` is within one Ethernet Frame.

```bash
$ bin/validate-weight
```
