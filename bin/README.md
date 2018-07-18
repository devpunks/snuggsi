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


## Table of Contents

  - [`browse`](#browse)
  - [`bundle`](#bundle)
  - [`compile`](#compile)
  - [`compress`](#compress)
  - [`cover`](#cover)
  - [`crank`](#crank)
  - [`deploy`](#deploy)
  - [`distribute`](#distribute)


## [`browse`](browse)

```bash
$ bin/browse [root]
```

  Executes the following step process _(in parallel)_:

  0. [`serve`](#serve)
  1. Launch [BrowserSync](https:/browsersync.io)
  2. [`watch`](#watch)

  ⚠️  _See [BrowserSync command line options](https://browsersync.io/docs/options) for configuration documentation._


### Environment Arguments

  - `root` - _(optional)_ path to serve from `/` _(Defaults to **`.` current directory**)_


### Environment Options

  - `PORT` - Server port _(Defaults to **3000**)_
  - `BROWSER_PORT` - Browser port _(Defaults to next available port after server `PORT` i.e. **3001** when `PORT=3000`)_



## [`bundle`](bundle)

```bash
$ bin/bundle
```

  Simple [`cat`](https://en.wikipedia.org/wiki/Cat_(Unix)) script for appending standalone ECMASCript modules into a single file.


## [`compile`](compile)

```bash
$ bin/compile
```

  Compiles distribution into a tiny little file.
  Executes the following step process _(in order of appearance)_:

  ⚠️  _Process will halt & prevent further execution upon failures._

  0. [`bundle`](#bundle)
  1. [`transpile`](#transpile)
  2. [`shrink`](#shrink)
  3. [`compress`](#compress)


## [`compress`](compress)

```bash
$ bin/compress
```

  Compression routine used for
  [`Content-Encoding`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Encoding)
  negotiation.

  Supports
    [`brotli`](https://en.wikipedia.org/wiki/Brotli) _(.br)_,
    [`gzip`](https://en.wikipedia.org/wiki/Gzip) _(.gz)_,
  & [`deflate`](https://en.wikipedia.org/wiki/Zlib) _(.zo)_
    Content Encoding tokens


## [`cover`](cover)

```bash
$ bin/cover
```

Uses
[`nyc`](https://github.com/istanbuljs/nyc)
_See [bin/cover](cover)_


## [`crank`](crank)

```bash
$ bin/crank
```

  Executes the following step process _(in order of appearance)_:
  ⚠️  _Build process will halt & prevent further execution upon failures._

  0. [`compile`](#compile)
  1. [`lint`](#lint)
  2. [`cover`](#coverage)
  3. [`weigh`](#weigh)
  4. [`distribute`](#distribute)
  5. [`deploy`](#deploy)


## [`deploy`](deploy)

```bash
$ bin/deploy
```

  Pushes repository to heroku host then launches application server.


## [`distribute`](distribute)

```bash
$ bin/distribute
```

  Used to mark revisions of library upstream


## Lint

```bash
$ bin/lint
```

Uses
[`JSStandard`](https://github.com/feross/standard)
_See [bin/lint](lint)_


## [serve](serve)

```bash
$ bin/serve [root]
```


### Environment Options

  - `PORT` - Server port _(Defaults to **80**)_


### Environment Arguments

  - `root` - _(optional)_ path to serve from `/` _(Defaults to **`.` current directory**)_


## Shrink

_See [bin/shrink](shrink)_

Run `uglify-js` and `uglify-es` along with minification
```bash
$ bin/shrink
```


## [style](style)

Please see [style#readme](/style#readme) for details.
```bash
$ bin/style [component-directory | style-file.{sss,css}]
```


## [`test`](test)


  Run entire test suite or specify an optional file or directory to test.

  Uses [`tape`](https://github.com/substack/tape)
  and [`tap-nyc`](https://github.com/MegaArman/tap-nyc)

```bash
$ bin/test [path]
```


### Environment Arguments

  - `path` - _(optional)_ Specific test directory or file. _(Defaults to run entire test suite)_


## [`transpile`](transpile)

  Run [Buble](https://buble.surge.sh) for transpilation from [ECMAScript to Javascript](https://stackoverflow.com/questions/912479/what-is-the-difference-between-javascript-and-ecmascript)

```bash
$ bin/transpile [input] [output]
```


### Environment Arguments

  - `input`  - _(optional)_ path _(Defaults to **dist/snuggsi.es**)_
  - `output` - _(optional)_ path _(Defaults to **dist/snuggsi.js**)_


## [watch](watch)

  Watch base directory for changes to markup, styles, and scripts.


```bash
$ bin/watch [directory]
```


### Environment Arguments

  - `directory` - _(optional)_ path to watch for changes _(Defaults to **current directory `.`**)_


## [`weigh`](weigh)

Routine to validate overall weight of library.
Validate `snuggsi.min.es.br` is within
[one Ethernet frame](https://en.wikipedia.org/wiki/Ethernet_frame)
_(1500 [OCTETS](https://en.wikipedia.org/wiki/Octet_(computing)))_.

```bash
$ bin/weigh [library]
```


### Environment Arguments

  - `library` - _(optional)_ path to watch for changes _(Defaults to **`dist/snuggsi.min.es.br`**)_



# References

  - https://gist.github.com/branneman/8775568
  - https://gist.github.com/branneman/8048520
  - https://stackoverflow.com/questions/10265798/determine-project-root-from-a-running-node-js-application
  - https://gist.github.com/branneman/8775568 https://gist.github.com/branneman/8048520 https://stackoverflow.com/questions/10265798/determine-projec
  - NODE_PATH on Heroku https://lostechies.com/derickbailey/2014/02/20/how-i-work-around-the-require-problem-in-nodejs
