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

  If you need support for windows [file an issue](https://github.com/devpunks/snuggsi/issues)
  with [this link appended to description](http://tldp.org/LDP/abs/html/dosbatch.html).


## Table of Contents

  `bin/`

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
  - [`publish`](#publish)
  - [`serve`](#serve)
  - [`shrink`](#shrink)
  - [`snuggsi`](#snuggsi)
  - [`style`](#style)
  - [`test`](#test)
  - [`transpile`](#transpile)
  - [`watch`](#watch)
  - [`weigh`](#weigh)


## [`browse`](browse)

```bash
$ bin/browse [root]
```

  Executes the following step process _(in parallel)_:

  0. [`serve`](#serve)
  1. Launch [BrowserSync](https://browsersync.io)
  2. [`watch`](#watch)

  ⚠️  _See [BrowserSync command line options](https://browsersync.io/docs/options) for configuration documentation._


### Arguments

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

  Pushes repository to [Δ Now](https://zeit.co/now) hosting service.


## [`distribute`](distribute)

```bash
$ bin/distribute
```


  Used to mark revisions of library upstream on [Github](https://github.com/devpunks/snuggsi)
  and [npm](https://npmjs.com/package/snuggsi).

  **NOTE:** A chronological [CalVer](https://calver.org) strategy is used instead of [SemVer](https://semver.org).


### References

  - https://calver.org/overview.html
  - https://github.com/mahmoud/calver
  - https://docs.npmjs.com/cli/v6/using-npm/semver
  - https://sedimental.org/designing_a_version.html
  - https://en.wikipedia.org/wiki/Software_versioning
  - https://github.com/mahmoud/zerover
  - [Tex Versioning](https://en.wikipedia.org/wiki/Software_versioning#TeX)
  - [Difference between `LTS` and `stable`](https://stackoverflow.com/questions/33661274/what-are-the-differences-between-long-term-support-lts-and-stable-versions-of)


#### Github Actions
  - Building and testing Node.jso
  - Github Encrypted Secrets - https://docs.github.com/en/free-pro-team@latest/actions/reference/encrypted-secrets
  - Publishing packages to npm directory from Github - https://docs.github.com/en/free-pro-team@latest/actions/guides/publishing-nodejs-packages#publishing-packages-to-the-npm-registry

  Steps:

### CalVer

  - [Ubuntu Version History](https://en.wikipedia.org/wiki/Ubuntu_version_history)


#### Annual Major Release
``` bash
git pull -r origin master
npm whoami
npm owner
npm org devpunks ls
npm token
npm config
npm issues # Github issues
npm doctor
npm audit  # Cleanup npm packages
npm ci
npm version major -m "⏰  %s CalVer Annual Major Release"
npm cache add <folder>
npm shrinkwrap # https://docs.npmjs.com/cli/v6/configuring-npm/package-locks
npm deprecate <pkg>[@<previous-year-version>] <message>
npm publish --tag=stable
npm version prepatch -m "⏰  %s Happy New Year !"
git push origin master
git push origin master --tags
# Create a git release - https://docs.github.com/en/free-pro-team@latest/rest/reference/repos#create-a-release--code-samples
```


#### Monthly Minor Release

``` bash
# Update node
git pull -r origin master
npm view
npm ls
npm outdated
npm install -g npm@latest
npm update --also=dev
npm prune
npm dedupe
npm link # https://docs.npmjs.com/cli/v6/commands/npm-link
npm rebuild
npm update
npm pack
npm issues # Github issues
npm bugs # Github issues
npm version minor -m "⏰  %s CalVer Monthly Minor Release"
npm publish --tag=stable
npm version prepatch -m "⏰  %s It\'s the first of the month!"
git push origin master
git push origin master --tags

# Create a git release - https://docs.github.com/en/free-pro-team@latest/rest/reference/repos#create-a-release--code-samples
```


#### Daily Patch Release

``` bash
# Automated Midnight

git pull -r origin master
npm version patch
npm publish
npm version prepatch -m "😴  %s Night Night !"
git push origin master
git push origin master --tags


# Tools

npm edit <pkg>[/<subpkg>...]
npm explore some-dependency -- git pull origin master
npm test


# Manual Pre Release & Bug fixes

git pull -r origin master
npm version prerelease
npm publish
git push origin master
git push origin master --tags
# Create a git release - https://docs.github.com/en/free-pro-team@latest/rest/reference/repos#create-a-release--code-samples

```

## [`integrate`](integrate)

```bash
$ bin/integrate
```

  Hook used for [Travis CI](https://travis-ci.org) continuous integration.
  This is typically ran after pushes to Github branches.

  _See [.travis.yml](/.travis.yml#L20) for more details._


## [`lint`](lint)

```bash
$ bin/lint [file]
```

  Performs [lint check](https://en.wikipedia.org/wiki/Lint_(software))
  on code in specified file.

  Uses [`JSStandard`](https://github.com/feross/standard)


### Arguments

  - `path` - _(optional)_ Specific  file to run lint check. _(Defaults to **`dist/snuggsi.es`**)_


## [`package`](package)

```bash
$ bin/package
```

  🚧 This algorithm will be implemented to minify distribution. (i.e. Tree Shaking)

  0. Packaging components
  1. Containerizing components


### References

  - [Tree Shaking](https://en.wikipedia.org/wiki/Tree_shaking)
  - [Dead Code Elemination](https://en.wikipedia.org/wiki/Dead_code_elimination)
  - [MDN Tree Shaking](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking)
  - [Dead Code Elemination During Bundling](http://exploringjs.com/es6/ch_modules.html#_benefit-dead-code-elimination-during-bundling)
  - [Docker Containerization](https://docs.docker.com/engine/examples/)
  - [Dockerizing a Node.js Web App](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)


## [`publish`](publish)

```bash
$ bin/publish
```
  Publishes static assets (i.e. examples, markup, styles, & scripts)


## [`serve`](serve)

```bash
$ bin/serve [root]
```

  Launches web server with `root` as main entry point.


### Environment Options

  - `PORT` - Server port _(Defaults to **80**)_


### Arguments

  - `root` - _(optional)_ path to serve from `/` _(Defaults to **`.` current directory**)_


## [`shrink`](shrink)

```bash
$ bin/shrink
```

  Run `uglify-js` and `uglify-es` along with minification


## [`snuggsi`](snuggsi)

```bash
$ snuggsi [command]
```

  Main entry point for `snuggsi` CLI (Command Line Interface).
  The help menu will display if no command is provided.

  _[See list of optional commands above](#table-of-contents)_


### Environment Options

  - `NODE_PATH` - Override `NODE_PATH` global location _(See [Loading from the global folders](https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders) Node documentation)_


## [`style`](style)

```bash
$ bin/style [component-directory | style-file.{sss,css}]
```

Please see [style#readme](/style#readme) for details.


## [`test`](test)


```bash
$ test [path]
```

  Run test suite or specify an optional entry point to test.

  Uses [`tape`](https://github.com/substack/tape)
  and [`tap-nyc`](https://github.com/MegaArman/tap-nyc)


### Arguments

  - `path` - _(optional)_ Specific test directory or file. _(Defaults to run entire test suite)_


## [`transpile`](transpile)

```bash
$ bin/transpile [input] [output]
```
  Run [Buble](https://buble.surge.sh) for transpilation from [ECMAScript to Javascript](https://stackoverflow.com/questions/912479/what-is-the-difference-between-javascript-and-ecmascript)


### Arguments

  - `input`  - _(optional)_ path _(Defaults to **dist/snuggsi.es**)_
  - `output` - _(optional)_ path _(Defaults to **dist/snuggsi.js**)_


## [`watch`](watch)

```bash
$ bin/watch [directory]
```
  Watch base directory for changes to markup, styles, and scripts.



### Arguments

  - `directory` - _(optional)_ path to watch for changes _(Defaults to **current directory `.`**)_


## [`weigh`](weigh)

```bash
$ bin/weigh [library]
```

  Routine to validate overall weight of library.
  Validate `snuggsi.min.es.br` is within
  [one Ethernet frame](https://en.wikipedia.org/wiki/Ethernet_frame)
  _(1500 [OCTETS](https://en.wikipedia.org/wiki/Octet_(computing)))_.


### Arguments

  - `library` - _(optional)_ path to watch for changes _(Defaults to **`dist/snuggsi.min.es.br`**)_



# References

  - https://gist.github.com/branneman/8775568
  - https://gist.github.com/branneman/8048520
  - https://stackoverflow.com/questions/10265798/determine-project-root-from-a-running-node-js-application
  - https://gist.github.com/branneman/8775568 https://gist.github.com/branneman/8048520 https://stackoverflow.com/questions/10265798/determine-projec
  - NODE_PATH on Heroku https://lostechies.com/derickbailey/2014/02/20/how-i-work-around-the-require-problem-in-nodejs
