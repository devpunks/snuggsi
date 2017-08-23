
  <h1 align=center>snuggsi ツ - Easy Web Components in
    <a href=https://github.com/devpunks/snuggsi/tree/master/dist#readme>~1kiloByte</a>
  </h1>
</p>

<p align=center>
  <a href=https://npmjs.org/package/snuggsi target=external>
    <img alt='NPM monthly downloads' src=https://img.shields.io/npm/dm/snuggsi.svg?style=flat>
  </a>

  <a href=https://travis-ci.org/devpunks/snuggsi target=external>
    <img alt='Travis CI build' src=https://travis-ci.org/devpunks/snuggsi.svg?branch=master>
  </a>

  <a href=https://github.com/devpunks/snuggsi/tree/master/dist#readme target=external>
    <img alt='Brotli size' src=https://img.shields.io/badge/Brotli%20size:-~%201kB-ff69b4.svg>
  </a>

  <a href=https://www.npmjs.com/package/snuggsi target=external>
    <img src=https://img.shields.io/npm/v/snuggsi.svg alt='npm version'>
  </a>

  <a href=https://david-dm.org/devpunks/snuggsi target=external>
    <img src=https://david-dm.org/devpunks/snuggsi/status.svg alt='dependency status'>
  </a>

  <a href=https://github.com/devpunks/snuggsi/blob/master/LICENSE.txt target=external>
    <img src=https://img.shields.io/npm/l/snuggsi.svg alt=license>
  </a>

<!-- CodeCov
  <a href='https://codecov.io/github/devpunks/snuggsi?branch=master' target=external>
    <img src=https://codecov.io/gh/devpunks/snuggsi/branch/master/graph/badge.svg alt='Coverage via Codecov'>
  </a>
-->

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
<script src=//unpkg.com/snuggsi/dist/snuggsi.min.es.js></script>
```

Et Voila _(that's it!)_ ツ

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
<!-- snuggsiツ (modern) -->
<script nomodule src=//unpkg.com/snuggsi></script>

<!-- webcomponents polyfill -->
<script
  name=polyfill
  src=//cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/1.0.0/webcomponents-hi-ce.js>
</script>
```

**⚠️  Warning ⚠️** _**snuggsiツ (classic)** will back support to Internet Explorer 11+._

_We shall provide our best effort to support IE 11+ through
[EOL](https://en.wikipedia.org/wiki/End-of-life_(product)#Computing)_

_Please read [Microsoft Internet Explorer end-of-life announcement](https://www.microsoft.com/en-us/windowsforbusiness/end-of-ie-support) for further details._


# Quick Tour

## [Element](/elements/element.es)

Play [Hello World Demo](https://jsfiddle.net/snuggs/w02kL17n/1/)

The following is a snippet from [examples/hello-word](/examples/hello-world/index.html)

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

  onclick ()
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

We have a `<template>` in the DOM and need to:

1. Bind a context (or Javascript object) to the template
2. Append rendered template to the document.
  - If `context` is an object `bind` a single `<template>`.
  - If `context` is a collection (i.e. `Array`) `bind` a tandem collection of `<template>`s.

3. or use default `<template>` from within an HTML Import.

See [MDN &lt;template&gt;](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template)
for more details


### `<template>` With `Object` Context

```html
<section id=lead></section>

<template name=developer>
  <!-- `{name}` will bind to `context` property `name` -->
  <h1>{name}</h1>
</template>

<script src=//unpkg.com/snuggsi></script>
<script>

const
  template = Template `developer`
, context  = { name: 'That Beast' }

template.bind (context)

</script>
```

#### Resulting HTML
```html
<section id='lead'>
  <h1>That Beast</h1>
</section>
```


### `<template>` With `Array` Context

```html
<ul>
  <template name=item>
    <li>Hello {name}!</li>
  </template>
</ul>

<script src=//unpkg.com/snuggsi></script>
<script>

// when context is a collection
const
  template = Template `item`
, context  = [ {name: 'DevPunk'}, {name: 'Snuggsi'} ]

// internal template render for each item in context
template.bind (context)

</script>
```

#### Resulting HTML
```html
<ul>
  <!-- invisible -->
  <template name=item>
    <li>Hello {name}!</li>
  </template>

  <li>Hello DevPunk!</li>
  <li>Hello Snuggsi!</li>
</ul>
```

### `<template>` Defaults _(HTML Custom Element Import)_

#### Master Document `foo-bar.html`

```html
<template onclick=onfoo>
  <h1>foo-bar custom element</h1>

  <slot name=content>Some Default Content</slot>

  <ul>
  <template name=bat>
    <li>Item {#} - Value {self}
  </template>
  </ul>

</template>

<script>

Element `foo-bar`

(class extends HTMLElement {

  onfoo (event) { alert `Registered on foo-bar` }

  get bat ()
    { return ['football', 'soccer', 'baseball'] }
})

</script>
```

#### Import Document `index.html`
```html
<script src=//unpkg.com/snuggsi></script>

<link rel=import name=foo-bar href=foo-bar.html>

<!-- <foo-bar onclick=onfoo></foo-bar> -->
<foo-bar>
  <p slot=content>The quick brown fox jumped over the lazy dog
</foo-bar>

<!-- After import

<foo-bar onclick=onfoo>
  <h1>foo-bar custom element</h1>

  <p slot=content>The quick brown fox jumped over the lazy dog

  <ul>
    <li>Item 0 - Value football
    <li>Item 1 - Value soccer
    <li>Item 2 - Value baseball
  </ul>
</foo-bar>

-->
```


## Build Process

Snuggsi is able to use modern compression algorithms to create
bundles as small as *~1500 OCTETS* _(or one 1500byte Ethernet packet frame)_

[Read More](https://github.com/devpunks/snuggsi/tree/master/dist#readme)
