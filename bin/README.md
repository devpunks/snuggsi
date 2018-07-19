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

  `bin`

  - [`browse`](#browse)
  - [`bundle`](#bundle)
  - [`compile`](#compile)
  - [`compress`](#compress)
  - [`cover`](#cover)
  - [`crank`](#crank)
  - [`deploy`](#deploy)
  - [`distribute`](#distribute)
  - [`integrate`](#integrate)
  - [`lint`](#lint)
  - [`package`](#package)
  - [`serve`](#serve)
  - [`shrink`](#shrink)
  - [`style`](#style)
  - [`test`](#test)
  - [`transpile`](#transpile)
  - [`watch`](#watch)


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


  Used to mark revisions of library upstream on [Github](https://github.com/devpunks/snuggsi)
  and [npm](https://npmjs.com/package/snuggsi).


## [`integrate`](integrate)

```bash
$ bin/integrate
```

  Hook used for [Travis CI](https://travis-ci.org) continuous integration.
  This is typically ran after pushes to Github branches.


## [`lint`](lint)

```bash
$ bin/lint [file]
```

  Performs [lint check](https://en.wikipedia.org/wiki/Lint_(software))
  on code in specified file.

  Uses [`JSStandard`](https://github.com/feross/standard)


### Environment Arguments

  - `path` - _(optional)_ Specific  file to run lint check. _(Defaults to **`dist/snuggsi.es`**)_


## [`serve`](serve)

```bash
$ bin/serve [root]
```

  Launches web server with `root` as main entry point.


### Environment Options

  - `PORT` - Server port _(Defaults to **80**)_


### Environment Arguments

  - `root` - _(optional)_ path to serve from `/` _(Defaults to **`.` current directory**)_


## [`shrink`](shrink)

```bash
$ bin/shrink
```
Run `uglify-js` and `uglify-es` along with minification


## [`style`](style)

```bash
$ bin/style [component-directory | style-file.{sss,css}]
```

Please see [style#readme](/style#readme) for details.


## [`test`](test)


```bash
$ bin/test [path]
```

  Run entire test suite or specify an optional file or directory to test.

  Uses [`tape`](https://github.com/substack/tape)
  and [`tap-nyc`](https://github.com/MegaArman/tap-nyc)


### Environment Arguments

  - `path` - _(optional)_ Specific test directory or file. _(Defaults to run entire test suite)_


## [`transpile`](transpile)

```bash
$ bin/transpile [input] [output]
```
  Run [Buble](https://buble.surge.sh) for transpilation from [ECMAScript to Javascript](https://stackoverflow.com/questions/912479/what-is-the-difference-between-javascript-and-ecmascript)


### Environment Arguments

  - `input`  - _(optional)_ path _(Defaults to **dist/snuggsi.es**)_
  - `output` - _(optional)_ path _(Defaults to **dist/snuggsi.js**)_


## [`watch`](watch)

```bash
$ bin/watch [directory]
```
  Watch base directory for changes to markup, styles, and scripts.



### Environment Arguments

  - `directory` - _(optional)_ path to watch for changes _(Defaults to **current directory `.`**)_


## [`weigh`](weigh)

```bash
$ bin/weigh [library]
```

  Routine to validate overall weight of library.
  Validate `snuggsi.min.es.br` is within
  [one Ethernet frame](https://en.wikipedia.org/wiki/Ethernet_frame)
  _(1500 [OCTETS](https://en.wikipedia.org/wiki/Octet_(computing)))_.


### Environment Arguments

  - `library` - _(optional)_ path to watch for changes _(Defaults to **`dist/snuggsi.min.es.br`**)_



# References

  - https://gist.github.com/branneman/8775568
  - https://gist.github.com/branneman/8048520
  - https://stackoverflow.com/questions/10265798/determine-project-root-from-a-running-node-js-application
  - https://gist.github.com/branneman/8775568 https://gist.github.com/branneman/8048520 https://stackoverflow.com/questions/10265798/determine-projec
  - NODE_PATH on Heroku https://lostechies.com/derickbailey/2014/02/20/how-i-work-around-the-require-problem-in-nodejs
