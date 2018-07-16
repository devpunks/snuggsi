# `bin`stubs

  > _[Binstubs are just scripts that can be executed directly: `bin/test` as opposed to `sh bin/test`](https://github.com/devpunks/snuggsi/pull/175#issuecomment-405039811)_ - [@brandondees](https://github.com/brandondees)

  Imperative convenience scripts Used conjunctively to automate declarative actions.
  Could potentially be used on "User Land" applications in the near future.

  **⚠️ For internal use only** _(for the time being)_
  
  _The following script will clone repository and install developer dependencies_

```bash
$ git clone https://github.com/devpunks/snuggsi.git
$ cd snuggsi && npm i
```


If you need support for windows file a ticket with [this link appended to description](http://tldp.org/LDP/abs/html/dosbatch.html).


## [bin/crank](crank)

```bash
$ bin/crank
```

  Executes the following build step process _(in order of appearance)_

  ⚠️  Build process will halt & prevent further execution upon failures

  0. [`bin/compile`](#compile)
  1. [`bin/lint`](#lint)
  1. [`bin/cover`](#coverage)
  1. [`bin/weigh`](#weigh)
  2. [`bin/distribute`](#distribute)
  3. [`bin/deploy`](#deploy)



## Browse
Watch files and hot inject browser assets on file change.

_See [bin/browse](browse)
&amp; [Browser Sync command line options](https://www.browsersync.io/docs/options) for configuration documentation._

```bash
$ bin/browse
```


## Style
Please see [style#readme](/style#readme) for details.
```bash
$ bin/style [component-directory | style-file.{sss,css}]
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


## Coverage

Uses
[`nyc`](https://github.com/istanbuljs/nyc)
_See [bin/cover](cover)_

```bash
$ bin/cover
```


## Lint

Uses
[`JSStandard`](https://github.com/feross/standard)
_See [bin/lint](lint)_

```bash
$ bin/lint
```


## Distribute

Used to mark revisions of library upstream

```bash
$ bin/distribute
```


## Deploy

Launches web server and library dependency host

```bash
$ bin/deploy
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

Compression routine used for `Content-Encoding`
negotiation.

_(Supports `gzip` & `zlib` Content Encoding tokens)_
```bash
$ bin/compress
```


## Weigh

_See [bin/weigh](weigh)_

Weigh ecmascripts routine.
```bash
$ bin/weigh
```


## Validate Weight

_See [bin/validate-weight](validate-weight)_

Validate that `snuggsi.min.es.br` is within one Ethernet Frame.

```bash
$ bin/validate-weight
```
