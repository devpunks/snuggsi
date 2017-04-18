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

### jQuery `$ (selector)`
Returns a collection _([Just like jQuery](http://stackoverflow.com/questions/7183704/jquery-id-selector-id-returns-array#answer-7183714))_
```
// Polyfill for Sizzle CSS selection

const $ = selector => // always returns a collection. Just like jQuery
  ('string' === typeof selector)
    ? document.querySelectorAll (selector)
    : selector // identity function

$('body').length // 1

let element = document.body
$(element) === document.body  // true
```

### jQuery `$.on (event, selector, handler)`
```
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener

$.on =
  (event, selector, handler) =>
    $(selector)[0].addEventListener (event, handler)

// `selector` is CSS selector to apply event handler.

$.on ( 'click', 'body',
  event => console.log (`${this} was clicked!`)
)

// `this` is a reference to the selected element
```

### jQuery `$.ajax (url)`
```
// Modern `fetch ()` API support
// https://davidwalsh.name/fetch
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

$.ajax =
  url => fetch (url)

$.ajax (`https://youmightnotneedjquery.com`).
  then (response => console.dir (response))
```

### [tag](/elements/tag.es)
Easy way to create HTML tag strings and bind them to a context.

#### Must Know
Template Literals
  - "Tagged" Templates - https://leanpub.com/understandinges6/read#leanpub-auto-tagged-templates
  - Template String Literals - http://www.2ality.com/2015/01/template-strings-html.html

Copy & pasta dependency from the following link into developer console.

_✅  No worries! No foolishness here !_
https://raw.githubusercontent.com/snuggs/snuggsi/master/elements/tag.es

_[Console](https://developer.chrome.com/devtools#console) example snippet_
```Javascript

// "Traditional" style
tag `<p>Hello from ${name} !</p>`

// Bound context
tag `<p>Hello from {name} !</p>` ({ name: 'Snuggs' })

// "Funcy" style (Coffeescript friendly)
tag `<p>Hello from {name} !</p>`
  ({ name: 'Max' })

// "Ruby" style

tag (`<p>{name}</p>`, { name: 'Dees' })

// "Funcy" style (Coffeescript friendly)
tag (`<p>{name}</p>`)
  ({ name: 'Brian' })

// Events set on parent will not be thrashed.
document.
  addEventListener
    ('click', event => console.warn (event, event.target) )

let template = tag `<p>{name}</p><button id={id}>{other}</button>`
  ({ name: 'Snuggs', id: 'shazaam', other: 'Dees' })

// Updates entire body without thrashing parental event handlers.
document.body.innerHTML = template
```

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

### Notes
Taken from [SASSC-ruby](https://github.com/sass/sassc-ruby)
  - http://blog.sass-lang.com/posts/1022316-announcing-dart-sass

warning: "Ruby Sass, on the other hand, will eventually go away unless a new maintainer appears. We don't want to make the transition sudden and risk fracturing the ecosystem: Chris and I are committed to maintaining it for one year, which includes keeping the language in sync with any new additions in Dart Sass. If anyone is interested in volunteering as a maintainer after that period, we'd be thrilled to mentor them and teach them the codebase over the coming year. But if no one steps up, Ruby Sass will be officially considered deprecated and unmaintained.

I want to emphasize that we aren't making the decision to stop developing Ruby Sass lightly. This is a big change, and it's not an easy one for me—I've worked on Ruby Sass continuously for almost ten years now, and it's difficult to let that history go. But Chris and I have discussed this thoroughly, and we're convinced this is the right move. We only have so much time to devote to Sass, and it no longer makes sense to put that time into an implementation that's so slow as to be infeasible for many of our largest users."

_Supports > Rails 5.x_

If you’re lucky enough to be starting with a brand new application, you can use the `--skip-sprockets` option when you create the app.
```bash
$ rails new AwesomeApp --skip-sprockets # 🎉Yay🎉
```

#### Turbolinks
  - https://sevos.io/2017/02/27/turbolinks-lifecycle-explained.html
  - Why you **shouldn't** bind events directly to `document`
    - http://stackoverflow.com/questions/12824549/should-all-jquery-events-be-bound-to-document#answers-header

  - http requests - https://github.com/turbolinks/turbolinks/blob/c73e134731ad12b2ee987080f4c905aaacdebba1/src/turbolinks/http_request.coffee#L20-L22
  - https://github.com/turbolinks/turbolinks/issues/152
  - https://gist.github.com/snuggs/f24303a6d3ce584e7582672f8b40c54f

#### Configuring Rails Assets
Blade sprockets testing - https://github.com/javan/blade

  - template streaming - https://github.com/rails/rails/issues/23828
Default Raw template handling
  - https://github.com/rails/rails/commit/8bea607265a2c9bb9bb2188b0a79089ca373b814
  - https://github.com/rails/rails/commit/4be859f0fdf7b3059a28d03c279f03f5938efc80

Relies on ActionController::Renderer to render templates
  - https://github.com/rails/rails/pull/18546
  - http://guides.rubyonrails.org/5_0_release_notes.html#action-pack-notable-changes

Template lookup for I18n
  - https://github.com/rails/rails/commit/ecb1981b

  - configuring-assets

#### Why a New Asset Pipeline ?
  - https://corcoran.io/2014/05/27/moving-past-rails-asset-pipeline/

#### Why a Rack skeleton server ?
https://news.ycombinator.com/item?id=4517021
"Rails" is a collection of libraries and conventions, just as "Sinatra + ActiveRecord" is. There's nothing inherent in it that makes it "worse" than Sinatra (which I love, by the way) for JSON APIs.

Use Rack, pick your favorite gems, and go to town. Why mess with all the other Sinatra junk when you can have a simple config.ru for your app and just write a simple call method and you're good to go?

You don't need all the ceremony and structure of Sinatra to write a JSON API, you just don't.

#### Deployment to Heroku
https://github.com/sass/sassc-rails

Due to LibSass compilation requirements, you must upgrade to the
[Heroku Cedar-14 Stack](https://devcenter.heroku.com/articles/cedar-14-migration)
in order to successfully install this gem.

Upgrading to Cedar-14 is usually a painless process.

## Contributing

1. Fork it ( https://github.com/[my-github-username]/snuggsi/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
