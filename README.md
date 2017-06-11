<p align=center>
  <h1 align=center>snuggsi ツ - Easy Web Components in
    <a href=https://github.com/devpunks/snuggsi/tree/master/dist#readme>~1Kilobyte</a>
  </h1>
</p>

<p align=center>
  <a href=https://npmjs.org/package/snuggsi>
    <img alt='NPM monthly downloads' src=https://img.shields.io/npm/dm/snuggsi.svg?style=flat>
  </a>

  <a href=https://github.com/devpunks/snuggsi/tree/master/dist#readme>
    <img alt='Brotli size' src=https://img.shields.io/badge/Brotli%20size:-~%201Kb-brightgreen.svg>
  </a>

  <a href=https://www.npmjs.com/package/snuggsi>
    <img src=https://img.shields.io/npm/v/snuggsi.svg alt='npm version'>
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

  <a href=https://github.com/devpunks/snuggsi/issues target=external>
    <img src=https://img.shields.io/badge/PRs-welcome-brightgreen.svg alt='Pull requests welcome!'>
  </a>

<p align=center>
  <strong align=center>All you need is a browser and basic knowledge of HTML &amp; Javascript to be productive!</strong>

<p align=center>
  "Performance is the art of avoiding work" - #FreeJewelry 💍 💎
</p>


## Why ?
  1. You prefer [convention over configuration](https://en.wikipedia.org/wiki/Convention_over_configuration)
  2. Because [You (probably) don't need a Javascript Framework](https://slack-files.com/T03JT4FC2-F151AAF7A-13fe6f98da)
  3. Web Components ARE [ready for production](https://twitter.com/WebReflection/status/761316429559922688)

     &amp; [Custom Elements v1](https://www.w3.org/TR/custom-elements) has full
     [support for every modern browser including Internet Explorer 11+ / Edge](https://github.com/webcomponents/webcomponentsjs#browser-support)


## Easy Installation
No need for Node.js, Webpack, Babel, or Gulp.

**snuggsiツ** works in production or in a plain 'ol HTML file!

Simply place the following script within your webpage:

```html
<!-- http(s): protocol required to run locally -->
<script nomodule src=//unpkg.com/snuggsi></script>
```

Et Voila _(that's it!)_ ツ

See [ECMAScript Module Imorts](https://github.com/devpunks/snuggsi/wiki/Module-Imports)
for `<script type=module>` support!


## Browser Support

  | Feature    | IE11+ | Edge* | Chrome* | Firefox* | Safari 9+* | Chrome Android* | Mobile Safari* |
  | ---------- |:-----:|:-----:|:-------:|:--------:|:----------:|:---------------:|:--------------:|
  | Custom Elements |✅ |✅ |✅ |✅ |✅ |✅ |✅ |
  | Templates |✅ |✅ |✅ |✅ |✅ |✅ |✅ |
  | HTML Imports |✅ |✅ |✅ |✅ |✅ |✅ |✅ |
  | Shadow Dom | | |✅ |✅ | | | |

  _\*Indicates the current version of the browser_

  The [webcomponentsjs](https://github.com/webcomponents/webcomponentsjs)
  polyfills are intended to work in the latest versions of browsers.

Place the `<script name=polyfill … >` below before **snuggsiツ** for
[evergreen cross-browser](https://www.techopedia.com/definition/31094/evergreen-browser) support.

```html
<!-- webcomponents polyfill -->
<script
  name=polyfill
  src=//cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/1.0.0/webcomponents-hi-ce.js>
</script>

<!-- snuggsiツ (modern) -->
<script
  type=module
  name=snuggsi
  src =//unpkg.com/snuggsi>
</script>

<!-- snuggsiツ (classic) -->
<script
  nomodule
  name=classic
  src =//unpkg.com/snuggsi/snuggsi.min.js>
</script>
```

**⚠️  Warning ⚠️** _**snuggsiツ (classic)** will back support to Internet Explorer 11+._

_We shall provide our best effort to support IE 11+ through
[EOL](https://en.wikipedia.org/wiki/End-of-life_(product)#Computing)_

_Please read [Microsoft Internet Explorer end-of-life announcement](https://www.microsoft.com/en-us/windowsforbusiness/end-of-ie-support) for further details._


# Quick Tour

## [Element](/elements/element.es)

Play [Hello World Demo](https://jsfiddle.net/rmv8e2vz/)

The following is a snippet from [examples/hello-word.html](/examples/hello-world.html)

_See [examples](/examples#readme) for more details_

``` html
<hello-world>
 Hello {planet}
</hello-world>

<script src=https://unpkg.com/snuggsi></script>
<script defer>

// Element Definition -----------------------------

Element `hello-world`

// Class Description ------------------------------

(class extends HTMLElement {

  static onclick ()
    // "automagic" event registration
    { alert (this.textContent) }

  get planet ()
    // "automagic" token binding
    { return 'world 🌎' }
})

</script>
```

## [Template](/elements/html-template-element.es)

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

<script nomodule src=//unpkg.com/snuggsi></script>
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

<script nomodule src=//unpkg.com/snuggsi></script>
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

</script>
```

## Build Process

Snuggsi is able to use modern compression algorithms to create
bundles as small as *~1500 OCTETS* _(or one 1500byte Ethernet packet frame)_

[Read More](https://github.com/devpunks/snuggsi/tree/master/dist#readme)


## Browse Examples
```bash
$ git clone https://github.com/devpunks/snuggsi.git
$ cd snuggsi && npm i
$ npm run browse
```

