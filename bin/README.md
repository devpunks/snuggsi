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


## [browse](browse)

```bash
$ bin/browse
```


### Environment Options

  - `PORT` - Server port _(Defaults to **3000**)_
  - `BROWSER_PORT` - Browser port _(Defaults to next available port after server `PORT` i.e. **3001** when `PORT=3000`)_

  Executes the following step process _(in parallel)_:

  0. [`serve`](#serve)
  1. Launch [BrowserSync](https:/browsersync.io)
  2. [`bin/watch`](#watch)

  ⚠️  _See [BrowserSync command line options](https://browsersync.io/docs/options) for configuration documentation._


## [bundle](bundle)

```bash
$ bin/bundle
```

  Simple [`cat`](https://en.wikipedia.org/wiki/Cat_(Unix)) script for appending standalone ECMASCript modules into a single file.


## [crank](crank)

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


## [serve](serve)

```bash
$ bin/serve [path]
```

### Environment Options

  - `PORT` - Server port _(Defaults to **80**)_
  - `ROOT` - path to serve from `/` _(Defaults to **public**)_


### Environment Arguments

  - `path` - _(optional)_ path to serve from `/` _(Defaults to **public**)_


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

Run Buble for transpilation from ECMAScript to Javascript
```bash
$ bin/transpile
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


# References

  - https://gist.github.com/branneman/8775568
  - https://gist.github.com/branneman/8048520
  - https://stackoverflow.com/questions/10265798/determine-project-root-from-a-running-node-js-application
  - https://gist.github.com/branneman/8775568 https://gist.github.com/branneman/8048520 https://stackoverflow.com/questions/10265798/determine-projec
  - NODE_PATH on Heroku https://lostechies.com/derickbailey/2014/02/20/how-i-work-around-the-require-problem-in-nodejs
