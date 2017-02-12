# snuggsi

Browser component extensions.

https://w3c.github.io/webcomponents/spec/custom

_Why?_ We don't need _(yet)_ another framework.
We need _"syntactic sugar"_ around new spec driven browser features.
Consider them _"DOM Extensions"_ as you are always interacting with
Living DOM nodes. This gives you the ability to gradually incorporate
these extensions into your existing code! Best of all,
works in your browser today! _for the most part_. And if the feature doesn't,
it will in the immediate future without you having to "update" anything. The
browsers are working dilligently abiding by the specs. Therefore not only can
we use the features today, this `README` alone will better acclaimate you to
*modern browser development using javascript*.

## Syntactic DOM "Sugar"

### [Text](/elements/text.js)

`bind`ing for `textContent` mutations between two `Nodes`.
`Text` nodes are portable and can be used freely throughout code.
Best use case is when you need to keep track of element changes
without touching the DOM, or worse causing a reflow / repaint _(i.e. `appendChild()`, `.innerText`, `.innerHTML`)_

#### Must Know
  - `Text` - https://github.com/snuggs/snuggsi#text-1
  - `Node.textContent` - https://github.com/snuggs/snuggsi#nodetextcontent
  - `Document.querySelector ()` - https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector

Copy & pasta dependency from the following link into developer console.

_✅  No worries! No foolishness here !_
https://raw.githubusercontent.com/snuggs/snuggsi/master/elements/text.js

_[Console](https://developer.chrome.com/devtools#console) example snippet_
```Javascript
const name = new Text ('devPunks')
name.textContent // "devPunks"

const h1 = document.querySelector ('h1')
h1.textContent  // "Default Header"

// now let's bind text to a DOM node
// Text node takes precedence over element contents
name.bind (h1)
h1.textContent  // "devPunks"
name.textContent === h1.textContent // true

// now let's update the DOM node
// (which will implicitly update `Text` node)
h1.textContent = 'So RAD!'
name.textContent  // "So RAD!"
name.textContent === h1.textContent // true

// 2 way text content binding!
```

### [State](/state.js)

How to manage state over time.

### [Attribute](/elements/attribute.js)
Living Standard ([Web IDL](/elements/attribute.idl))

Attribute binding relay

### [Attributes](/elements/attributes.js)

Attributes named node map.

### [Template](/elements/template.js)

`<template>` to `DocumentFragment` element renderer.

## Testing
"Update April 2016: since writing this post, I've moved to using tap which spawns individual processes for each test file, so I don't need this approach at all now."

- https://remysharp.com/2015/12/14/my-node-test-strategy
- https://remysharp.com/2016/02/08/testing-tape-vs-tap

## [DOM Levels](https://developer.mozilla.org/fr/docs/DOM_Levels)

Salute🙏  to [@domenic](https://github.com/domenic) for the alley-oop 🏀,
and being such a prolific contributor to the community.
Also owe ya a matcha tea 🍵  for the JSDOM help.

_"What's the difference between the
[W3C](https://w3.org) and the [WHATWG](https://whatwg.org) ?"_

https://www.reddit.com/r/javascript/comments/5swe9b/what_is_the_difference_between_the_w3c_and_the

### Modern DOM Interfaces
The following are the minimum set of *modern* DOM APIs
you should be familiar with today. Each API has a `console`
example snippet. Just copy / pasta the examples into the
developer console and _"It just works!" ™_

#### CSS Selectors
https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Selectors

#### Template Literals
Template literals are string literals allowing embedded expressions
_([string interpolation](https://en.wikipedia.org/wiki/String_interpolation))_.
As you may have noticed the [Grave accent](https://en.wikipedia.org/wiki/Grave_accent) _(``)_
is used instead of double/single quotes.
You can use multi-line strings and string interpolation features with them.
They were called "template strings" in prior editions of the ES2015 specification.
```Javascript
`Hello !`

`Line one of text
 Line two (with preserved \n`

const greeting = 'world'
`Hello ${greeting} !`

tag `string text ${greeting} string text`
```

"Tagged" Template Literals
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_template_literals

Raw Strings
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Raw_strings

ECMAScript 2015 Specification Standard
http://www.ecma-international.org/ecma-262/6.0/#sec-template-literals

ECMAScript 2017 Draft
https://tc39.github.io/ecma262/#sec-template-literals


#### Templates
The *HTML _<template>_* element is a mechanism for holding client-side content
that is not to be rendered when a page is loaded but may subsequently
be instantiated during runtime using JavaScript. 

Think of a template as a content fragment that is being stored for subsequent use in the document.
While the parser does process the contents of the <template> element while loading the page,
it does so only to ensure that those contents are valid; the element's contents are not rendered, however.

MDN
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template

HTML5
https://www.w3.org/TR/html5/scripting-1.html#the-template-element

Living Standard
https://html.spec.whatwg.org/multipage/scripting.html#the-template-element


#### Text
The Text interface represents the textual content of Element or Attr.  If an element has no markup within its content, it has a single child implementing Text that contains the element's text.  However, if the element contains markup, it is parsed into information items and Text nodes that form its children.

*WIP* _Internet Explorer polyfill_

Also see `Document.createTextNode` https://developer.mozilla.org/en-US/docs/Web/API/Document/createTextNode

_[Console](https://developer.chrome.com/devtools#console) example snippet_
```Javascript
const empty = new Text ()
const full  = new Text ('Yo! 👊')

empty.textContent // ""
empty.textContent = 'Hey! ✋'

console.log (empty.textContent) // 'Hey! ✋'

console.log (full.textContent)  // "Yo! 👊"
```

MDN `Text ()` Constructor Documentation - https://developer.mozilla.org/en-US/docs/Web/API/Text/Text

MDN `Text` Documentation - https://developer.mozilla.org/en-US/docs/Web/API/Text


#### DocumentFragment
AKA _"How did 'front-end frameworks' miss this?"_

The DocumentFragment has been proven to be the fastest method of updating DOM Tree.
The implementation was spec'd all the way back in DOM Level 1. We should be using this today!

- Dom Fragments - http://ejohn.org/blog/dom-documentfragments/

MDN
https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment

Living Standard
https://dom.spec.whatwg.org/#interface-documentfragment

DOM Level 3
https://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-B63ED1A3

DOM Level 2
https://www.w3.org/TR/DOM-Level-2-Core/core.html#ID-B63ED1A3

DOM Level 1
https://www.w3.org/TR/DOM-Level-1/level-one-core.html#ID-B63ED1A3

Selectors API Level 2
https://dev.w3.org/2006/webapi/selectors-api2


#### Document.querySelector
Returns the first Element within the document
(using depth-first pre-order traversal of the document's nodes
by first element in document markup and iterating through sequential
nodes by order of amount of child nodes) that matches the specified group of selectors.

_[Console](https://developer.chrome.com/devtools#console) example snippet_
```Javascript
// Select the <head> element
const head = document.querySelector ('head')
console.log (head)

// Select the <body> element
const body = document.querySelector ('body')
console.log (body)

// Returns the first `<h1>`
const h1 = document.querySelector ('h1')
console.log (h1)

// Returns the *first* HTMLElement with the `id` of `foo`
// (See https://developer.mozilla.org/en-US/docs/Web/API/Element/id)
const foo = document.querySelector ('#foo')
console.log (foo)

// Returns the *first* HTMLElement with `posts` within its `classList`
// (See https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)
const posts = document.querySelector ('.posts')
console.log (posts)
```

MDN
https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector

Selectors API Level 2
https://dev.w3.org/2006/webapi/selectors-api2/#interface-definitions

#### Document.querySelectorAll
Returns the first Element within the document
(using depth-first pre-order traversal of the document's nodes
by first element in document markup and iterating through sequential
nodes by order of amount of child nodes) that matches the specified group of selectors.

_[Console](https://developer.chrome.com/devtools#console) example snippet_
```Javascript
// Returns a collection of *all* HTMLElement(s) with `posts` within its `classList`
// (See https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)
const posts = document.querySelector ('.posts') // [<a class="posts">,<section class="posts">, ...]
console.log (posts)

// Returns a collection of *all* HTMLParagraphElement(s)
const paragraphs = document.querySelector ('p')
console.log (paragraphs) // [<p>,<p>, ...]

// Returns an collection if not found
const zebras = document.querySelector ('zebras')
console.log (zebras) // []
```

MDN
https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll

Selectors API Level 2
https://dev.w3.org/2006/webapi/selectors-api2/#interface-definitions



#### Node.textContent
_[Console](https://developer.chrome.com/devtools#console) example snippet_
```Javascript
// Must be on any page with an `<h1>`
const h1 = document.querySelector ('h1')
h1.textContent // "Hello World"
```

MDN
https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent

Living Standard
https://dom.spec.whatwg.org/#dom-node-textcontent

DOM Level 1
https://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-textContent

#### MutationObserver
Why `MutationObserver` has comparable performance to `Proxy`.

_(shouts to @ebidel for this one)_
https://gist.github.com/ebidel/d923001dd7244dbd3fe0d5116050d227

Mutation Observer Tutorial
https://dev.opera.com/articles/mutation-observers-tutorial

MDN
https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver

Living Standard
https://dom.spec.whatwg.org/#mutation-observers
https://dom.spec.whatwg.org/#mutationobserver

DOM Level 4
https://www.w3.org/TR/dom/#mutationobserver

#### Rendering (Re-Flow, Re-Layout, Re-Paint)

https://www.phpied.com/rendering-repaint-reflowrelayout-restyle

![Rendering (Layout, Reflow, Repaint, & Redraw)](http://www.phpied.com/files/reflow/render.png)

* render tree - the visual part of the DOM tree
* nodes in the render tree are called frames or boxes
* recalculating parts of the render tree is called reflow (in Mozilla), and called layout in every other browser, it seems
* Updating the screen with the results of the recalculated render tree is called repaint, or redraw (in IE/DynaTrace)
* SpeedTracer introduces the notion of "style recalculation" (styles without geometry changes) vs. "layout"


10 ways to minimize reflows & improve performance

https://www.sitepoint.com/10-ways-minimize-reflows-improve-performance


#### ~~MutationEvents~~ _(deprecated)_
*No longer used*
https://www.w3.org/TR/DOM-Level-3-Events/#legacy-mutationevent-events
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
See [watch.browser.js](watch.browser.es)
& [Browser Sync command line options](https://www.browsersync.io/docs/options) for configuration documentation.
```bash
$ npm run browse
```

#### Testing
```bash
$ npm test
```

#### Test Coverage
```bash
$ npm run cover
```

#### Dependencies
  - [Tap](https://github.com/tapjs/node-tap)
  - [Browser Sync](https://browsersync.io/)
  - [jsdom](https://github.com/tmpvar/jsdom)

#### Notes
REDUX Demistified -
  - https://hackernoon.com/if-not-redux-then-what-fc433234f5b4#.tyisp17cy
  - https://hackernoon.com/thinking-in-redux-when-all-youve-known-is-mvc-c78a74d35133#.2v46lnu4c
  - http://stackoverflow.com/questions/39977540/can-redux-be-seen-as-a-pub-sub-or-observer-pattern

### Ruby
[![Gem Version](https://badge.fury.io/rb/snuggsi.svg)](http://badge.fury.io/rb/snuggsi)

*WIP*

- [ ] Sprockets bindings
- [ ] Rails engine

## Installation

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

#### Turbolinks - https://gist.github.com/snuggs/f24303a6d3ce584e7582672f8b40c54f

#### Configuring Rails Assets
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
