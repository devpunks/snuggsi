<p align=center>
  <a href=https://www.npmjs.com/package/snuggsi>
    <img src=https://img.shields.io/npm/v/snuggsi.svg alt='npm version'>
  </a>

  <a href=https://www.npmjs.com/package/snuggsi>
    <img src=https://img.shields.io/npm/v/snuggsi.svg alt='npm version'>
  </a>

  <a href=https://npmjs.org/package/snuggsi>
    <img alt='NPM monthly downloads' src=https://img.shields.io/npm/dm/snuggsi.svg?style=flat>
  </a>

  <a href=https://david-dm.org/devpunks/snuggsi target=external>
    <img src=https://david-dm.org/devpunks/snuggsi/status.svg alt='dependency status'>
  </a>

  <a href=https://github.com/devpunks/snuggsi/blob/master/LICENSE.txt target=external>
    <img src=https://img.shields.io/npm/l/snuggsi.svg alt=license>
  </a>

  <a href='https://codecov.io/github/devpunks/snuggsi?branch=master' target=external>
    <img src=https://codecov.io/gh/devpunks/snuggsi/branch/master/graph/badge.svg alt='Coverage via Codecov'>
  </a>
</p>

<p align=center>
  <h1>snuggsi ツ - Easy Web Components</h1>

  <em>"Performance is the art of avoiding work"<em> - #FreeJewelry :ring: :gem:
</p>

## Why ?
  1. With *snuggsi ツ* you don't need Node.js, Webpack, Babel, or Gulp to be productive. Just a browser and HTML
  2. Because [You (probably) don't need a Javascript Framework](https://slack-files.com/T03JT4FC2-F151AAF7A-13fe6f98da)
  3. Web Components ARE [ready for production](https://twitter.com/WebReflection/status/761316429559922688)
     &amp; [Custom Elements v1](https://www.w3.org/TR/custom-elements) has full
     [support for every modern browser including Internet Explorer 11+ / Edge](https://github.com/webcomponents/webcomponentsjs#browser-support)


## Easy Installation
place the following `<script>` in the `<head>` of `<html>` page
```html
<script nomodule src=https://unpkg.com/snuggsi/snuggsi.js></script>
```
Et Voila _(that's it!)_

## Module Imports Installation
The [TC39 group process](https://tc39.github.io/process-document) has recently come to an agreement on module imports
implementation within the browser platforms. *snuggsi ツ* supports ECMAscript module `import`
with backwards compatible custom elements support.

And so should you!

See [ECMAScript Module Imorts](https://github.com/devpunks/snuggsi/wiki/ECMAScript)
for more details.

```html
<script type=module src=https://unpkg.com/snuggsi/snuggsi.es></script>

<script nomodule src=https://unpkg.com/snuggsi/snuggsi.js></script>
<script nomodule src=https://unpkg.com/snuggsi/examples/webcomponents-hi-ce.js></script>
```

## Browser Support

  | Feature    | IE11+ | Edge* | Chrome* | Firefox* | Safari 9+* | Chrome Android* | Mobile Safari* |
  | ---------- |:-----:|:-----:|:-------:|:--------:|:----------:|:---------------:|:--------------:|
  | Custom Elements | ✓ | ✓ | ✓ | ✓ | ✓ | ✓| ✓ |
  | Templates | ✓ | ✓ | ✓ | ✓ | ✓ | ✓| ✓ |

  _\*Indicates the current version of the browser_

  The [webcomponentsjs](https://github.com/webcomponents/webcomponentsjs)
  polyfills are intended to work in the latest versions of evergreen browsers.

  The polyfills may work in older browsers, however require additional polyfills
  (such as classList, or other [platform](https://github.com/webcomponents/webcomponents-platform) polyfills)
  to be used. We cannot guarantee support for browsers outside of the compatibility matrix.


# Quick Tour

## [Element](/elements/element.es)
[examples/hello-word.html](/examples/hello-world.html)

_See [examples](/examples) for more details._


``` html
<hello-world>
 Hello {planet}
</hello-world>

<script nomodule src=https://unpkg.com/snuggsi/snuggsi.js></script>
<script nomodule>

// Custom Element Definition -----------------------------

Element `hello-world`

// Class Description -------------------------------------

(class extends HTMLElement {

  static onclick ()
    // "automagic" event registration to static class methods
    { alert (this.textContent) } // for shits & giggles 💩 😆

  get planet ()
    // "automagic" token binding to class properties
    { return 'world 🌎' }
})

</script>
```

## [Template](/elements/template.es)

`<template>` to appendable `DocumentFragment`.

You have a `<template>` in the DOM and you need to:

1. Bind a context (or Javascript object) to the template
2. Append rendered template to the document.
  - If `context` is an object `bind` a single `<template>`.
  - If `context` is a collection (i.e. `Array`) `bind` a tandem collection of `<template>`s.

See [MDN &lt;template&gt;](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template)
for more details

### Standalone Template

```html
<section id=lead></section>

<template name=developer>
  <!-- `{name}` will bind to `context` property `name` -->
  <h1>{name}</h1>
</template>

<script nomodule src=https://unpkg.com/snuggsi/snuggsi.js></script>
<script nomodule>

const
  template = Template `developer`
, context  = { name: 'That Beast' }

template
  .bind (context)

document
  .getElementById ('lead')   // select element to append bound template
  .append (template.content) // .content returns an appendable HTMLDocumentFragment
  // see https://html.spec.whatwg.org/multipage/scripting.html#dom-template-content

/*
   <section id='lead'>
     <h1>That Beast</h1>
   </section>
*/

</script>
```


### Collection Template

```html
<ul>
  <template name=item>
    <li>Hello {name}!</li>
  </template>
</ul>

<script nomodule src=https://unpkg.com/snuggsi/snuggsi.js></script>
<script nomodule>

// when context is a collection
const
  template = Template `item`
, context  = [ {name: 'DevPunk'}, {name: 'Snuggsi'} ]

template
   // internal template render for each item in context
  .bind (context)

document
  .querySelector ('ul')
  .append (template.content)

/*
<ul>
  <li>Hello DevPunk!</li>
  <li>Hello Snuggsi!</li>
</ul>
*/
```


## Developer Installation
```bash
$ git clone https://github.com/devpunks/snuggsi.git
$ cd snuggsi && npm i
$ npm run browse
```

## Development Dependencies
  - [Node.js](https://nodejs.org/en/download/)
  - [Tap](https://github.com/tapjs/node-tap)
  - [Browser Sync](https://browsersync.io)
  - [jsdom](https://github.com/tmpvar/jsdom)


## Scripts

### Browse
Watch files and hot inject browser assets on file change.
See [watch.browser.es](watch.browser.es)
& [Browser Sync command line options](https://www.browsersync.io/docs/options) for configuration documentation.
```bash
$ npm run browse
```

### Watch Tests
Watch ecmascripts routine. [watch.es](watch.es)
```bash
$ npm run watch
```
### Compile
Run transpile, uglify, gzip, and weigh
```bash
$ npm run compile
```

### Transpile
Run bundle, and Buble for transpilation from ECMAScript to Javascript
```bash
$ npm run transpile
```

### Bundle
Simple con`cat` script for standalone ECMASCript modules
```bash
$ npm run bundle
```

### Uglify
Run uglifyjs along with minification
```bash
$ npm run uglify
```

### Compress
gzip total byte size of bundled ecmascripts
```bash
$ npm run compress
```

### Weigh
Weigh ecmascripts routine.
_(gzip total byte size of bundled ecmascripts)_
```bash
$ npm run weigh
```

### Testing

```bash
$ npm test
```

[jsdom](https://github.com/tmpvar/jsdom) is used heavily to produce this code.
It is an awesome test framework that implements a virtual dom based on the
WEB-IDL specifications that are used on the HTML5, CSS, and ECMAScript standards board.

JSDOM has the potential to be a replacement for phantomjs in most cases for a fraction of the memory thumbprint.

_"Update April 2016: since writing this post, I've moved to using tap which spawns individual processes for each test file, so I don't need this approach at all now."_

  - https://remysharp.com/2015/12/14/my-node-test-strategy
  - https://remysharp.com/2016/02/08/testing-tape-vs-tap

### Test Coverage
```bash
$ npm run cover
```


## Contributing

1. Fork it ( https://github.com/devpunks/snuggsi/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

