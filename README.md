# snuggsi ツ - Easy Web Components

## Easy Installation
place the following in the `<head>` of `<html>` page
```html
<script src=//unpkg.com/snuggsi/snuggsi.js></script>
```

## Module Imports Installation
ECMAscript module `import`s with backwards compatible custom elements support.

```html
<script nomodule    src=//unpkg.com/snuggsi/examples/webcomponents-hi-ce.js></script>
<script nomodule    src=//unpkg.com/snuggsi/snuggsi.js></script>
<script type=module src=//unpkg.com/snuggsi/snuggsi.es></script>
```
  - https://blog.hospodarets.com/native-ecmascript-modules-new-features
  - https://github.com/whatwg/html/pull/2261
  - https://html.spec.whatwg.org/multipage/scripting.html#attr-script-nomodule
  - https://trac.webkit.org/changeset/211078/webkit
  - https://blog.hospodarets.com/native-ecmascript-modules-the-first-overview
  - https://github.com/w3c/web-platform-tests/pull/4611
  - https://www.iana.org/assignments/media-types/application/ecmascript
  - https://www.iana.org/assignments/media-types/application/javascript
  - https://github.com/tc39/ecma262/issues/322

# Quick Tour

## [Element](/elements/element.es)
``` html
<hello-world></hello-world>
```

``` javascript
Element `hello-world`

(class extends HTMLElement {
  initialize ()
    { this.append ('Hello World') }
})
```

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


## Contributing

1. Fork it ( https://github.com/[my-github-username]/snuggsi/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
