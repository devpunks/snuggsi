<h1 align=center>snuggsi ツ - Easy Web Components in <a href=https://github.com/devpunks/snuggsi/tree/master/dist#readme>~1kiloByte</a> </h1>

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
  <strong align=center>All you need is a browser and basic understanding of <a href=https://developer.mozilla.org/en-US/docs/Web/HTML target=mdn>HTML</a>, <a href=https://developer.mozilla.org/en-US/docs/Web/CSS target=mdn>CSS</a>, &amp; <a href=https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes target=mdn>Javascript classes</a> to be productive!</strong>

<p align=center>
  <q>
    <em>
      <a
        href=http://nonprofits.agileventures.org/2017/03/16/who-needs-frameworks target=help>
        Performance is the art of avoiding work
      </a>
    </em>
  </q> - #FreeJewelry 💍 💎
</p>


## Why ?
  1. You prefer to be [D.R.Y.](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) and build reusable web components on a gradual learning curve.
  2. Because [You _(probably)_ don't need a Javascript Framework](https://slack-files.com/T03JT4FC2-F151AAF7A-13fe6f98da)
  3. You prefer [convention over configuration](https://en.wikipedia.org/wiki/Convention_over_configuration)

  4. [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
     are [ready](https://twitter.com/domenic/status/904114041752358913)
     for [production](https://twitter.com/WebReflection/status/761316429559922688)
     &amp; [Custom Elements v1](https://www.w3.org/TR/custom-elements) has
     [full support for every modern browser including Internet Explorer 11+ / Edge](#browser-support)


## Easy Installation
Made with [💖 Vanilla JS™](http://vanilla-js.com) No need to learn Node.js, Webpack, Babel, or Gulp. __*#UseThePlatform*__

**snuggsiツ** works in production or in a plain 'ol HTML file!

Simply place the following script within your webpage:

```html
<!-- http(s): protocol required to run locally -->
<script src=//unpkg.com/snuggsi></script>
```

Et Voila _(that's it!)_ ツ

## Browser Support

_**snuggsiツ** provides a [prolyfill](https://github.com/devpunks/snuggsi/wiki/What-is-a-ProlyFill) for the following native web platform features:_


  | Support    | IE11+ | Edge* | Chrome* | Firefox* | Safari 9+ | Android* | iOS Safari* |
  | ---------- |:-----:|:-----:|:-------:|:--------:|:---------:|:--------:|:--------------:|
  | [Templates](#templates) |✅ |✅ |✅ |✅ |✅ |✅ |✅ |
  | [Custom Elements](#custom-elements) |✅ |✅ |✅ |✅ |✅ |✅ |✅ |
  | Slot Replacement |✅ |✅ |✅ |✅ |✅ |✅ |✅ |

  _\*Indicates the current version of the browser_

**⚠️  Warning ⚠️** _We shall provide our best effort to support IE 11+ through
[EOL](https://en.wikipedia.org/wiki/End-of-life_(product)#Computing)_

_Please read [Microsoft Internet Explorer end-of-life announcement](https://www.microsoft.com/en-us/windowsforbusiness/end-of-ie-support) for further details._


# Quick Tour

## [Custom Elements](/element#readme)

Play [Hello World Demo](https://jsfiddle.net/snuggs/w02kL17n)

``` html
<hello-kitty icon=😻 >

  <header>{greeting}</header>

  <figure>
    <figcaption>
      <button onclick=meow>Hello Kitty!</button>
    </figcaption>

    <img alt='Random kitty cat' src={kitty} onclick=pet >
  </figure>

</hello-world>

<script src=//unpkg.com/snuggsi></script>
<script>

Element `hello-kitty`

(class extends HTMLElement {

// 👇 Description ------------------------------

(class extends HTMLElement {

  set icon // on element
    // method signature
    ( value = this.getAttribute `icon` )
      { this.setAttribute (`icon`, value) }

  get icon () // from element
    { return this.getAttribute `icon` }

  get planet () // "automagic" token binding
    { return `world ${ this.icon }` }

  onclick () { // event handler
    // "automagic" event registration
    alert (`You clicked on ${e.target.tagName} ${ this.icon }`)
  }
})

</script>
```

## [Templates](/html-template-element#readme)

The `<template>` is used to define custom element content for use within multiple elements.

Useful when we need to:

1. Separate a custom element definition into a [Web Component](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
2. Bind a context to the template using An `Array` or POJO _(Plain Ol' Javascript `Object`)_
3. Append rendered template to the document:
    - If `context` is an object `bind` a single `<template>`
    - If `context` is a collection _(i.e. an `Array`)_ `bind` a sequential  `<template>` [`DocumentFragment`](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment) per item


### `<template>` With `Object` Context

```html
<template name=developer>
  <!-- `{nickname}` will bind to `context` property `nickname` -->
  <h1>{nickname}</h1>
</template>

<script src=//unpkg.com/snuggsi></script>
<script>

const
  template = Template `developer`
, context  = { nickname: 'That Beast' }

template.bind (context)

</script>
```

### Rendered Result
```html
<template name="developer">
<!-- invisible
  <h1>{name}</h1>
 -->
</template>

<h1>That Beast</h1><!-- template is used as head for tail insertion -->
```


### `<template>` With `Array` of `Object`s Context

  Each `<template name>` will be mapped over each
  context item within the array. When the array items
  are objects each property will map to a respective
  `{token}` of the same name.

  _**Note:** The `#` symbol is used to retrieve the collection's current index of iteration._

```html
<ul>
  <template name=item>
    <li>Hello {name}! Your index # is {#}
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

### Rendered Result
```html
<ul>
  <template name="item">
  <!-- invisible
    <li>Hello {name}! Your index # is {#}
  -->
  </template>

  <li>Hello DevPunk! Your number index # is 0</li>
  <li>Hello Snuggsi! Your number index # is 1</li>
</ul>
```


### `<template>` With Scalar `Array` Context

  Each `<template name>` will be mapped over each
  context item within the array. When the array items
  are scalar _(i.e. strings, numbers, booleans)_
  each item will map to a `{self}` helper token.

  _**Note:** The `#` symbol is used to retrieve the collection's current index of iteration._

```html
<dl>
  <template name=recipe>
    <dt> Step {#}.
    <dd> {self}.

  </template>
</dl>

<script src=//unpkg.com/snuggsi></script>
<script>

// when context is a collection of scalar variables (i.e. Strings)
const
  template = Template `recipe`
, context  = [
    "Preheat oven"
  , "Place pre-made cake in oven"
  , "Don't burn the cake"
  , "Nom Nom"
  ]

// internal template render for each item in context
template.bind (context)

</script>
```


### Rendered Result
```html
<dl>
  <template name="recipe"> … </template>

  <dt> Step 1.</dt>
  <dd> Preheat oven.</dd>

  <dt> Step 2.</dt>
  <dd> Place pre-made cake in oven.</dd>

  <dt> Step 3.</dt>
  <dd> Don't burn the cake!</dd>

  <dt> Step 4.</dt>
  <dd> Nom Nom!</dd>

</dl>
```


## Build Process

**snuggsiツ** is able to use modern compression algorithms to create
bundles as small as *~1500 OCTETS* _(or one 1500byte Ethernet packet frame)_

[Read More](https://github.com/devpunks/snuggsi/tree/master/dist#readme)


## Contributors

Contributing while using [Visual Studio Code](https://code.visualstudio.com/) is simple!  _[Read More](./.vscode#readme)_
