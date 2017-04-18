# snuggsi ツ - Easy Web Components

## Syntactic DOM "Sugar"

## [Template](/elements/template.es)

`<template>` to appendable `DocumentFragment`.

You have a `<template>` in the DOM and you need to:

1. Bind a context (or Javascript object) to the template
2. Append rendered template to the document.
  - If `context` is an object `bind` a single `<template>`.
  - If `context` is a collection (i.e. `Array`) `bind` a tandem collection of `<template>`s.

_See [Templates](https://github.com/snuggs/snuggsi#templates) for an in depth explaination._

### Object Template
Copy & pasta dependency from the following link into developer console.

https://raw.githubusercontent.com/snuggs/snuggsi/master/elements/template.es

_[Console](https://developer.chrome.com/devtools#console) example snippet_

_Must have following HTML `<template>` element within DOM_

```HTML5
<section id='lead'></section>

<template name='developer'>
  <h1>{name}</h1>
</template>
```

```Javascript
const context = { name: 'That Beast' }
    , template = Template `developer`

// bind to context
template
  .bind (context)
  .content // an appendable HTMLDocumentFragment
  // see https://html.spec.whatwg.org/multipage/scripting.html#dom-template-content

document
  // select element to append bound template
  .querySelector ('#lead')
  // notice template is still bound to context from earlier
  .append (template.content)

// <section id='lead'><h1>That Beast</h1></h1></section>
```


### Collection Template
_[Console](https://developer.chrome.com/devtools#console) example snippet_

_Must have following HTML `<template>` element within DOM_
```HTML5
<ul></ul>

<template name='item'>
  <!-- `{title}` will bind to `context` property `name` -->
  <li>Hello {title}!</li>
</template>
```

```Javascript
// when context is a collection
const context = [
  {name: 'DevPunk'}, {name: 'Snuggsi'}
]
const template = Template `item`

template
   // render template for each item in context
  .bind (context)
  .content // an appendable HTMLDocumentFragment

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

## Polyfills

### [Text](/elements/text.es)

`bind`ing for `textContent` mutations between two `Nodes`.
`Text` nodes are portable and can be used freely throughout code.
Best use case is when you need to keep track of element changes
without touching the DOM, or worse causing a reflow / repaint _(i.e. `append()`, `appendChild()`, `.innerText`, `.innerHTML`)_

#### Must Know
  - `Text` - https://github.com/snuggs/snuggsi#text-1
  - `Node.textContent` - https://github.com/snuggs/snuggsi#nodetextcontent
  - `Document.querySelector ()` - https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector

Copy & pasta dependency from the following link into developer console.

https://raw.githubusercontent.com/snuggs/snuggsi/master/elements/text.es

_[Console](https://developer.chrome.com/devtools#console) example snippet_
```Javascript
const name = new Text ('devPunks')
name.textContent // "devPunks"

const h1 = document.querySelector ('h1')
h1.textContent  // "Default Header"

// now let's bind text to a DOM node
// Text node takes precedence over element contents
name.bind (h1) // Now we're sync'd

// Any changes to either in memory text or HTML element
// will be relayed to its tandem
h1.textContent  // "devPunks"
name.textContent === h1.textContent // true

// now let's update the DOM node
// (which will implicitly update `Text` node)
h1.textContent = 'So RAD!'
name.textContent  // "So RAD!"
name.textContent === h1.textContent // true

// 2 way text content binding!
```


### _(Coming Soon in v1)_ [State](/state.es)
How to manage context state over time .


## Node
### Installation
```bash
$ npm install snuggsi
```

### Scripts
#### Watch Tests
Watch ecmascripts routine. [watch.es](watch.es)
```bash
$ npm run watch
```
#### Weigh
Weigh ecmascripts routine.
_(gzip total byte size of bundled ecmascripts)_
```bash
$ npm run weigh
```

#### Browse
Watch files and hot inject browser assets on file change.
See [watch.browser.es](watch.browser.es)
& [Browser Sync command line options](https://www.browsersync.io/docs/options) for configuration documentation.
```bash
$ npm run browse
```

#### Testing

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

#### Test Coverage
```bash
$ npm run cover
```

### Dependencies
  - [Tap](https://github.com/tapjs/node-tap)
  - [Browser Sync](https://browsersync.io/)
  - [jsdom](https://github.com/tmpvar/jsdom)

### Notes
Custom Elements v1
- https://toddmotto.com/web-components-concepts-shadow-dom-imports-templates-custom-elements/

```
class MyDiv extends HTMLElement {
  constructor(...args) {
    super(...args);
    this.addEventListener('click', console.log);
  }
  connectedCallback() {
    this.textContent = 'Hello World';
  }
}

customElements.define('my-div', MyDiv);

document.body.appendChild(new MyDiv);
```

Web Worker Harness
https://testdrive-archive.azurewebsites.net/HTML5/WebWorkerTest262


## Ruby
[![Gem Version](https://badge.fury.io/rb/snuggsi.svg)](http://badge.fury.io/rb/snuggsi)

*WIP*

- [ ] Sprockets bindings
- [ ] Rails engine

### Installation

Add this line to your application's Gemfile:
```ruby
gem "snuggsi"
```

Remove the following gems from Gemfile ([YAGNI](https://en.wikipedia.org/wiki/You_aren't_gonna_need_it))
```ruby
gem "uglifier" # We don't have to worry about this anymore!
gem "sass-rails" # We use SugarSS. No worries! looks like SASS.
gem "jquery-rails" # YES you won't need this anymore
gem "coffee-rails" # Coffeescript is out. ECMAScript is in!
```

And then execute:
```bash
$ bundle
```

Or install it yourself as:
```bash
$ gem install snuggsi
```

### Dependencies
  - [Minitest](https://github.com/seattlerb/minitest)
  - [Sprockets](https://github.com/rails/sprockets)

### Testing
```bash
$ rake test
```

## Contributing

1. Fork it ( https://github.com/[my-github-username]/snuggsi/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
