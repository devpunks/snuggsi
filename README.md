<h1 align=center>snuggsi ツ - Easy Web Elements in <a href=https://github.com/devpunks/snuggsi/tree/master/dist#readme>~1kiloByte</a> </h1>

<p align=center>
  <a href=https://www.npmjs.com/package/snuggsi target=external>
    <img alt='npm version' src=https://img.shields.io/npm/v/snuggsi.svg></a>

  <a href=https://npmjs.org/package/snuggsi target=external>
    <img alt='NPM monthly downloads' src=https://img.shields.io/npm/dm/snuggsi.svg?style=flat></a>

  <a href=https://github.com/devpunks/snuggsi/tree/master/dist#readme target=external>
    <img alt='Brotli size' src=https://img.shields.io/badge/Brotli%20size:-~%201kB-ff69b4.svg></a>

  <a href=https://github.com/devpunks/snuggsi/actions/workflows/nightly.yml target=external>
    <img alt='Crank Snuggsi' src=https://github.com/devpunks/snuggsi/actions/workflows/nightly.yml/badge.svg></a>

  <a href=https://github.com/devpunks/snuggsi/issues target=external>
    <img src=https://img.shields.io/badge/PRs-welcome-brightgreen.svg alt='Pull requests welcome!'>
  </a>

  <a href=https://github.com/devpunks/snuggsi/blob/master/LICENSE.txt target=external>
    <img alt=license src=https://img.shields.io/npm/l/snuggsi.svg></a>

<!-- CodeCov
  <a href='https://codecov.io/github/devpunks/snuggsi?branch=master' target=external>
    <img src=https://codecov.io/gh/devpunks/snuggsi/branch/master/graph/badge.svg alt='Coverage via Codecov'>
  </a>
-->

<p align=center>
  <strong align=center>All you need is a browser and basic understanding of <a href=https://developer.mozilla.org/en-US/docs/Web/HTML target=mdn>HTML</a>, <a href=https://developer.mozilla.org/en-US/docs/Web/CSS target=mdn>CSS</a>, &amp; <a href=https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes target=mdn>JavaScript Classes</a> to be productive!</strong>

<p align=center>
  <q><em>Performance is the art of avoiding work</em></q> - #FreeJewelry 💍 💎
</p>


# Navigation

 - [Why ?](#why-)
 - [Easy Installation](#easy-installation)
 - [Browser Support](#browser-support)
 - [Quick Tour](#quick-tour)
   - [&lt;`custom-elements`&gt;](#custom-elements)
     - [`HTML` Declaration](#html-declaration)
     - [`Element` Definition](#element-definition)
     - [`class` Description](#class-description)
   - [`Template`](#template)
 - [Build Process](#build-process)
 - [References](#references)
 - [Contributors](#contributors)


# [Why ?](https://github.com/devpunks/snuggsi/wiki/Why%3F)

> _I have a special disdain for beginner JavaScript tutorials that have you run `create-react-app` as the first step, and this exercise has only strengthened my conviction that every beginner programmer should get to grips with HTML, CSS and vanilla JS before delving into frameworks._
⸺ [_"Using the platform"_ - Elise Hein](https://elisehe.in/2021/08/22/using-the-platform)

  1. You prefer to be [D.R.Y.](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) and build reusable web components on a gradual learning curve.
  2. Because [You _(probably)_ don't need a JavaScript Framework](https://dev.to/steelvoltage/you-probably-don-t-need-a-front-end-framework-26o6).
  3. You prefer [convention over configuration](https://en.wikipedia.org/wiki/Convention_over_configuration).
  4. [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
     are [ready for production](https://medium.com/adobetech/the-web-platform-is-back-fa5752fabdfc)
     &amp; [Custom Elements v1](https://www.w3.org/TR/custom-elements) has
     [support for every 🍃 greenfield browser](#browser-support).


# Easy Installation

Made with [💖 Vanilla JS™](http://vanilla-js.com) No need to learn Node.js, React, Webpack, Babel, or Gulp.
_(You can if ya **want** to use **snuggsiツ**  with those tools. But you don't **need** to!)_

[__*#UseThePlatform*__](https://en.wikipedia.org/wiki/Web_platform)

**snuggsiツ** works in a plain ol' `*.html` file! Simply place the following `<script>` tag within your page:

```html
<script src=https://unpkg.com/snuggsi></script>
```

Et Voila _(that's it!)_ ツ

# Browser Support

_**snuggsiツ** provides a [prolyfill](https://github.com/devpunks/snuggsi/wiki/What-is-a-ProlyFill) for the following native web platform features:_


  | Support    | Edge* | Chrome* | Firefox* | Safari 9+ | Android* | iOS Safari* |
  |:----------:|:-----:|:-------:|:--------:|:---------:|:--------:|:--------------:|
  | [Templates](#templates) |✅ |✅ |✅ |✅ |✅ |✅ |
  | [Custom Elements](#custom-elements) |✅ |✅ |✅ |✅ |✅ |✅ |
  | Slot Replacement |✅ |✅ |✅ |✅ |✅ |✅ |

  _\*Indicates the current version of the browser_

# Quick Tour

**snuggsiツ** encourages [convention over configuration](https://en.wikipedia.org/wiki/Convention_over_configuration) using familiar techniques that are native to all browsers.

Gone are the sleepless nights where your code [suffers from `<div>`itus](https://css-tricks.com/css-beginner-mistakes-1/), or need to install packages on a terminal just to write `HTML`. **People who are more comfortable with `HTML` should be able to start creating their ideas immediately!** You shouldn't have to know CSS or JavaScript! _(But it definitely helps if you need styling and functionality)_.

 **snuggsiツ** believes in using [Progressive Enhancement](https://en.wikipedia.org/wiki/Progressive_enhancement). Not just with your code, but also with your Developer eXperience _(DX)_. We will start from the beginning with a simple Custom Element and gradually enhance functionality step-by-step.


## [&lt;`custom-elements`&gt;](/element#readme)

When picking a tag name for your custom element [there are a few naming conventions](https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name) you must be aware of. The tag name must start with a lowercase letter _(`a-z`)_ and include at least one hyphen _(`-`)_. For example, `a-b` and `c-` are both **valid** Custom Element tag names. However, `-d` and `e-F` are both **invalid** tag names due to the former starting with a hyphen and the latter containing an uppercase letter. These requirements distinguish custom elements from standard HTML elements and will ensure forward compatibility. For now, we can simply use `hello-world`.


### `HTML` Declaration

`HTML` has always been a declarative language. Why not just use it to _declare_ Custom Elements?
If you know [how to write `HTML`](https://developer.mozilla.org/en-US/docs/Web/HTML) you can start using **snuggsiツ** immediately. Sometimes you need to sandbox a section of your page for styling. Other times you need a custom container of complex functionality. In the bad ol' days you would usually start with a generic `HTML` element declaration _(e.g. `<div id="hello-world">`)_.


#### A Brief History Lesson

_Not all HTML tags are created equal!_

A _"valid `HTML` Element"_ has always _allowed_ non-standard tag names _(as long as you remember to provide a closing tag)_. In the bad old days of the web, [`HTML5` elements were once _"non-standard"_ to `HTML 4.0`](https://johnresig.com/blog/html5-shiv). However, these days we have far more flexibility in our markup. For example, some native `HTML` elements have an _optional_ closing tag _(e.g. `<p>`, `<li>` & `<td>`)_. While self-closing tags _can_ have an optional _(`/`)_ solidus mark _(e.g. `<br />` & `<img />`)_.

```html
<a>…</a> <!-- valid (hyperlink) -->
<b>…</b> <!-- valid (HTML4.01)-->
<c>…     <!-- invalid (no closing tag) -->
<c>…</c> <!-- valid (HTMLUnknownElement) -->
<p>…</p> <!-- valid (with closing tag)  -->
<p>…     <!-- valid (with optional closing tag)  -->
<img />  <!-- valid (x-HTML self closing tag)  -->
<hr>     <!-- valid (no content tag)  -->
```
👍 Rule of thumb: _Close all **non-standard** unknown `HTML` Element tags!_

<hr>

As you learned earlier there are a few conventions to adhere to be considered a _"valid **Custom** Element"_ the `HTML` tag name will need a lowercase alpha-numeric character followed by a hyphen _(at minimum)_:

```html
<foo></foo> <!-- invalid (CUSTOM element but valid HTML unknown element) -->
<foo-bar>   <!-- invalid (valid tag name, but invalid markup due to no closing tag) -->
<a-></a->   <!-- valid (minimum requirement of starting with an alpha character and includes a hyphen) -->
<foo-bar></foo-bar> <!-- valid (starts with alpha character, includes a hyphen, is completely lowercase, & has a closing tag) -->
```

👍 Rule of thumb: _Use [kebab case (with hyphens)](https://en.wiktionary.org/wiki/kebab_case) for tag names._

<hr>

We now know enough to be dangerous and make your own `HTML` Custom Element tag:

```html
<hello-world></hello-world>
```

Et Voila ツ _(No really … That's it!)_

<hr>

At this point your **custom** element can be styled using CSS just like any other element.

```html
<style>
  hello-world { background: #bada55 }
</style>

<hello-world>
  Hello
</hello-world>
```
See [A JavaScript-free custom element implementation](https://www.stefanjudis.com/notes/a-javascript-free-custom-element-implementation/)
And [Building a `<tool-tip>` component](https://web.dev/building-a-tooltip-component/) for more _(sans JavaScript)_ custom elements CSS fun!

<hr>


#### Live `{token}` Declarations


The `{token}` is simply a [well named dynamic variable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Variables) you will **Describe** later. `{token}`s are placeholders which watch for changes to your custom element's `class` property of the same name. Since they are _"placeholders"_ and not live code, Front-end designers are no longer blocked by needing to install a JavaScript framework just to write `CSS`!

```html
<foo-bar> This is a token 👉 {baz} and {bat} is another! </foo-bar>
```
👍 Rule of thumb: _If the `{token}` name is [not in a thesaurus](https://en.wikipedia.org/wiki/Metasyntactic_variable) then I probably shouldn't use it._

<hr>

A _"live token"_ is a declarative way to bind data values to your Custom Element. A nice convention to a real historical P.I.T.A. of keeping values updated. Live `{token}`s are also _"✨ automagically"_ updated each time the element re-renders.

Let's add a `{token}` to `<hello-world>`:

```html
<hello-world>

  Hello {planet}

</hello-world>
```
👍 Rule of thumb: _A `{token}` is not _"live"_ until there is a `class` description for its functionality._

<hr>

Lastly, we can visually enhance your `<hello-world>` Custom Element by making it [_"block level"_](https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements) with CSS `display: block`. This way your element plays nicely in your layout:

```html
<hello-world>

  Hello {planet}

  <style>
    hello-world { display: block }
  </style>

</hello-world>
```

We have finished your Custom Element **Declaration** using `HTML`, & `CSS`!🌟  Now on to your **Definition**.


<hr>


### `Element` Definition

Every Custom `Element` **MUST** be [_Defined_ within the `CustomElementsRegistry`](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry). This is simple with **snuggsiツ**

Let's `define` your element using the `Element` interface:

```javascript
// <hello-world> … </hello-world>

Element `hello-world`
```
👍 Rule of thumb: _Use backticks around tag names (``)._

This syntax is not JSX. It's actually called [tagged template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates) and is native to the platform.
Custom elements use the native `Element` interface definition strategy for two reasons:

  1. To prevent you from worrying about browser inconsistencies as the technology matures.
  2. Prevent global namespace pollution. _([`Element` has been native to the web platform for decades!](https://developer.mozilla.org/en-US/docs/Web/API/Element))_

Classic JavaScript syntax may also be used. However [this should be the job of a transpiler not the developer](https://en.wikipedia.org/wiki/Source-to-source_compiler).
Transpilers take care of [normalizing Modern JavaScript to a specific retrograde](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/JavaScript).

```javascript
Element ('hello-world') // classic javascript definition
```

<hr>


### `class` Description

Great so far!🎉  Although your Element behaves like any other `HTMLElement`, we should add some functionality custom to your needs.

Next, we need to pass a `class` description to the function returned by your `Element` definition.

```javascript
// <hello-world> … </hello-world>

Element `hello-world`

( class HelloWorld extends HTMLElement { … } )
```

👍 Rule of thumb: _**MUST** define [a `class` which `extends HTMLElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement)_

Let's shorten your description up a bit by using an [anonymous class expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/class) to describe the `class`. This convention is preferred as using an [explicit `class` declaration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/class) name can potentially pollute the global namespace:

```javascript
// <hello-world> … </hello-world>

Element `hello-world`

( class extends HTMLElement { … } )
```

👍 Rule of thumb: _Use enclosing parenthesis around `(class …)` definitions._


<hr>


#### Live `{token}` Definitions

Since we [previously declared a `{planet}` token](#live-tokens) within your `<hello-world>` element we need to also define a `class property` **of the same name** to replace the `{planet}` token with a value.

Class properties may look like typical JavaScript Functions. However, they are treated as properties. _(called without parenthesis)_. `class` properties are described by using the [`get`ter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get) and [`set`ter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set) annotations before the name.

Let's add a property to your `class` definition and give `{planet}` some life:

```javascript
// <hello-world> … {planet} … </hello-world>

Element `hello-world`

(class extends HTMLElement {

  get planet () // used for {planet} token
    // "✨ automagic" token binding
    { return 'world 🌎' }
})
```

👍 Rule of thumb: _`class` properties are functions begining with the keywords `get` &amp; `set`._

👍 Rule of thumb: _`{tokens}` will use the `class` property value of the same name by default._

⚠️ The Live `{token}` value is updated after each re-render but it beyond the scope of this simple example.

Since your `hello-world` Custom Element is an `HTMLElement` at its core, we can access your property directly from the DOM!

```javascript
// <hello-world> … </hello-world>

document.querySelector
  ('hello-world').planet // world 🌎
```
👍 Rule of thumb: _Do not use parenthesis `()` when calling `get`ters &amp; `set`ters._

<hr>


#### Global `event` Listeners

`event` handlers can be any method function which can be placed on any child elements and also onto the custom element itself _(i.e.`onclick=eatBacon`)_. However, you will not have to explicitly set the handler in HTML when you follow native naming conventions.  This is the magic behind **snuggsiツ** Global `event` Listeners. They register themselves onto the custom element and _"listen"_ for you! As a convenience, your new custom element uses [Event Delegation](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_delegation) to capture all its children's [event bubbles of the same name](https://javascript.info/bubbling-and-capturing).

```javascript
// <hello-world>
//   `onclick` is "automagically" attached
//
//   <a onclick=onsneeze> ACHOO! </a>
// </hello-world>

Element `hello-world`

(class extends HTMLElement {

  // native event handler names
  // are "✨automagically" attached to `hello-world`
  onclick (event) {

    // prevent event from bubbling
    // Custom Element will re-render
    // after event unless prevented
    event.preventDefault ()

    event.target // element which triggered event

    this // is ALWAYS bound to the Custom Element container 🎉
  }

  onsneeze (event) {
    /* must be declared in HTML
      <button onclick=onsneeze>
    */
  }
})
```

👍 Rule of thumb: _Use native `GlobalEventHandlers`_ names if you don't want to explicitly set listeners in HTML.


_See full list of [Global Event Handlers on MDN](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers)_

Lastly, all `event` handlers _(and global `event` listeners)_ are passed a native [`event` object](https://developer.mozilla.org/en-US/docs/Web/API/Event).

_P.S._ **YES** the event handler will _auto`bind`_ `this` to the **current** custom element instance! :tada:

<hr>


### Hello World! _(simple)_

[Play `<hello-world>` Demo](http://jsfiddle.net/vw4u6ycx)

_…or just copy & 🍝pasta  into a new HTML file and have at it!_

```html

<!-- 👇 Declaration --------------------------->

<hello-world>

  Hello {planet}

  <button onclick=speak>Greet</button>
</hello-world>


<script src=//unpkg.com/snuggsi></script>
<script>

// 👇 Definition -------------------------------

Element `hello-world`

// 👇 Description ------------------------------

(class extends HTMLElement {

  get planet () // property token
    // "✨ automagic" token binding
    { return 'world 🌎' }

  onclick (e) { // event handler
    // "✨ automagic" event registration
    alert(`You clicked on ${e.target.tagName}`)
  }
  
  speak(e) { // bound event handler
    e.preventDefault()
    alert('One small step...')
  }
})

</script>

```

<hr>


### Hello Kitty! _(advanced)_

[Play `<hello-kitty>` Demo](https://jsfiddle.net/yLdatmvz)

_…or just copy & 🍝pasta  into a new HTML file and have at it!_

```html

<hello-kitty icon=😻 >

  <header>{greeting}</header>

  <figure>
    <figcaption>
      <button onclick=meow>Hello new kitty!</button>
    </figcaption>

    <img alt='Random kitty cat' src={url} onclick=pet >
  </figure>

  <style>
    hello-kitty *
      { margin: 1em; text-align: center }
  </style>

</hello-kitty>

<script src=//unpkg.com/snuggsi></script>
<script>

Element `hello-kitty`

(class extends HTMLElement {

// CONSTRUCTOR ---------------------------------------

  initialize ()
    // see `meow` event handler
    { this.url = 'https://placekitten.com/400/400?image=' }


// PROPERTIES ----------------------------------------

  set icon // on element
    // default to html attribute
    ( value = this.getAttribute `icon` )
      // set html attribute to new value
      { this.setAttribute (`icon`, value) }

  get icon () // from element
    { return this.getAttribute `icon` }

  get greeting () // "✨ automagic" token binding
    { return `<hello-kitty> Carousel ${ this.icon }` }


// METHODS -------------------------------------------

  random () {
    return Math.round
      ( Math.random `` * 16 )
  }


// EVENT HANDLERS ------------------------------------

  onclick (e) {
    // "✨ automagic" global event handler registration
    alert (`You clicked on ${e.target.tagName} ${ this.icon }`)
  }

  pet ()
    { alert `Puuuuuurrrrrrrrrrrr!!!` }

  meow (e) { // custom handler
    e.preventDefault ``

    this.querySelector `img`
      .setAttribute (`src`, this.url + this.random () )

    // element will "✨ automagically" re-render !!!
  }
})

</script>

```

## [`Template`](/html-template-element#readme)

The `<template>` is used to define custom element content for use within multiple elements.

Useful when we need to:

1. Separate a custom element definition into a [Web Component](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
2. Bind a context to the template using An `Array` or POJO _(Plain Ol' JavaScript `Object`)_
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


## [Build Process](./dist#build-process)

**snuggsiツ** is able to use modern compression algorithms to create
bundles as small as *~1500 OCTETS* _(or one 1500byte Ethernet packet frame)_

[Read More](./dist#readme)


### [CalVer _(Calendar Versioning)_](./bin/README.md#version)

A chronological [CalVer](https://calver.org) strategy is used instead of [SemVer](https://semver.org).
[Read More](bin#version)


## References

  - [WebComponents Will outlive Your JavaScript Framework](https://youtube.com/watch?v=1vF6puwX3bE)


## Contributors

Please read [CONTRIBUTING.md](/CONTRIBUTING.md) before contributing.

Contributing while using [Visual Studio Code](https://code.visualstudio.com/) is simple!  _[Read More](./.vscode#readme)_
