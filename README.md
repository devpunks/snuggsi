# ツ snuggsi - Modern ECMAscript DOM extensions

https://w3c.github.io/webcomponents/spec/custom

_Why?_ We don't need _(yet)_ another framework.
We need _"syntactic sugar"_ around new spec driven browser features.
_"Javascript Browser Extensions"_ if you will.
For instance the _"DOM Extensions"_ are great to use
as you are always interacting with Living DOM nodes.
This gives you the ability to gradually incorporate
your extension of choice a la carte into your existing client side code!
Best of all, works in your favorite browser today! _for the most part_.
This means you can try out the extensions just by _"Copy & Pasta"_ 'ing directly
into your console straight from the README!

Modern client side Javascript specs have been moving at light speed the past couple of years.
Best to avoid front end frameworks wherever possible as the browser
can provide you with all you need in 2017! If you are uncomfortable
with a particular browser's javascript implementation then
_"[polyfills](https://en.wikipedia.org/wiki/Polyfill)"_ are typically trivial to implement.
You may be familiar with
[Douglas Crockford's](https://en.wikipedia.org/wiki/Douglas_Crockford) ~~JSON2~~ polyfill from back in the day.
_(Please use [JSON 3 Polyfill](https://bestiejs.github.io/json3) if you are still using `JSON2`)_
These backwards compatibility snippets can be injected
prior to your code. In the future they can be removed when you
feel your respective browser landscape has matured.
And if a feature we've implemented doesn't work to your liking feel free to
[submit an issue](https://github.com/snuggs/snuggsi) and we will attempt
a polyfill for you ASAP!

**Using modern DOM & ECMAScript browser specifications have allowed us to decrease
framework code by ~80%**. Hence why these are _"extensions"_ and
not _YAFF (Yet Another Front-end Framework)_.
**These extensions are so tiny they all weigh < 2KB!** _(uncommented,minified,gzipped)_. The browsers are working dilligently abiding by the specs and we should be
abiding by the hard work they have put in much work over the recent years. Finally the browsers are coming to fruition.
You are able to use these features for the immediate future without needint to "update" anything.
Therefore not only can we use modern style code today, this `README` alone will better acclaimate you to
*modern browser development best practices javascript* that you have always been curious to learn about.

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

## Syntactic DOM "Sugar"

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
tag `<p>Hello from {name} !</p>` ({ name: 'Snuggs' })

// "Funcy" style (Coffeescript friendly)
tag `<p>Hello from {name} !</p>`
  ({ name: 'Max' })

// "Ruby" style

tag (`<p>{name}</p>`, { name: 'Dees' })

tag (`<p>{name}</p>`)
  ({ name: 'Brian' })

// "Funcy" style (Coffeescript friendly)

tag `<p>Hello from {name} !</p>`
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
without touching the DOM, or worse causing a reflow / repaint _(i.e. `appendChild()`, `.innerText`, `.innerHTML`)_

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

### [Template](/elements/template.es)

`<template>` to appendable `DocumentFragment`.

You have a `<template>` in the DOM and you need to:

1. Bind a context (or Javascript object) to the template
2. Render the template.
  - If `context` is an object `bind` a single `<template`.
  - If `context` is a collection (i.e. `Array`) `bind` a tandem collection of `<template>`s.

_See [Templates](https://github.com/snuggs/snuggsi#templates) for an in depth explaination._

#### Object Template
Copy & pasta dependency from the following link into developer console.

https://raw.githubusercontent.com/snuggs/snuggsi/master/elements/tag.es
https://raw.githubusercontent.com/snuggs/snuggsi/master/elements/template.es

_[Console](https://developer.chrome.com/devtools#console) example snippet_

_Must have following HTML `<template>` element within DOM_

```HTML5
<section id='some-element'></section>

<template id='items'>
  <ul title={name}></ul>
</template>
```

```Javascript
const context = { name: 'That Beast' }
    , template = new Template ('#items') // can select by id without `#`

// bind to context
template
  .bind (context)
  .content // an appendable HTMLDocumentFragment
  // see https://html.spec.whatwg.org/multipage/scripting.html#dom-template-content

document
  // select element to append bound template
  .querySelector ('#some-element')
  // notice template is still bound to context from earlier
  .appendChild (template.content)

// <section id='some-element'><ul title='That Beast'></ul></section>
```


#### Collection Template
_[Console](https://developer.chrome.com/devtools#console) example snippet_

_Must have following HTML `<template>` element within DOM_
```HTML5
<ul></ul>

<template id='item'>
  <!-- `{name}` will bind to `context` property `name` -->
  <li>Hello {name}!</li>
</template>
```

```Javascript
// when context is a collection
const context = [
  {name: 'foo'}, {name: 'bar'}
]
const template = new Template ('#items')

template
   // render template for each item in context
  .bind (context)
  .content // an appendable HTMLDocumentFragment

document
  .querySelector ('ul')
  .appendChild (template.content)

/*
<ul>
  <li>Hello foo!</li>
  <li>Hello bar!</li>
</ul>
*/
```


### [Context](/context.es)

How to manage context state over time.

### [Attribute](/elements/attribute.es)
Living Standard ([Web IDL](/elements/attribute.idl))

Attribute binding relay

### [Attributes](/elements/attributes.es)

Attributes named node map.

## Modern DOM Interfaces
The following are the minimum set of *modern* DOM APIs
you should be familiar with today. Each API has a `console`
example snippet. Just copy / pasta the examples into the
developer console and _"It just works!" ™_


MDN DOM Levels https://developer.mozilla.org/fr/docs/DOM_Levels

Salute🙏  to [@domenic](https://github.com/domenic) for the alley-oop 🏀,
and being such a prolific contributor to the community.
Also owe ya a matcha tea 🍵  for the JSDOM help.

_"What's the difference between the
[W3C](https://w3.org) and the [WHATWG](https://whatwg.org) ?"_

https://www.reddit.com/r/javascript/comments/5swe9b/what_is_the_difference_between_the_w3c_and_the


### CSS Selectors
https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Selectors


### Text
The Text interface represents the textual content of Element or Attr.  If an element has no markup within its content, it has a single child implementing Text that contains the element's text.  However, if the element contains markup, it is parsed into information items and Text nodes that form its children.

*WIP* _Internet Explorer polyfill_

See also `Document.createTextNode` https://developer.mozilla.org/en-US/docs/Web/API/Document/createTextNode

_[Console](https://developer.chrome.com/devtools#console) example snippet_
```Javascript
( new Text ('Yo! 👊') )
  .textContent  // "Yo! 👊"

const empty = new Text ()
empty.textContent // ""
empty.textContent = 'Hey! ✋'
empty.textContent // 'Hey! ✋'
```

MDN `Text ()` Constructor Documentation - https://developer.mozilla.org/en-US/docs/Web/API/Text/Text

MDN `Text` Documentation - https://developer.mozilla.org/en-US/docs/Web/API/Text


### Template Literals
Template literals are string literals allowing embedded expressions
_([string interpolation](https://en.wikipedia.org/wiki/String_interpolation))_.
As you may have noticed the [Grave accent](https://en.wikipedia.org/wiki/Grave_accent) _(``)_
is used instead of double/single quotes.
You can use multi-line strings and string interpolation features with them.
They were called "template strings" in prior editions of the ES2015 specification.

_[Console](https://developer.chrome.com/devtools#console) example snippet_
```Javascript
void `Hello !`

void `Line one of text
  Line two (with preserved \n`

const greeting = 'world'
void `Hello ${greeting} !`

const tag = (...fragments) =>
  ({ parts: fragments.shift (), tokens: fragments })

tag `part before token ${greeting} part after token`
```

Template Literals
  - 2Ality - http://www.2ality.com/2015/01/template-strings-html.html
  - https://developers.google.com/web/updates/2015/01/ES6-Template-Strings

  - https://developer.mozillajorg/en-US/docs/Web/JavaScript/Reference/Template_literals

"Tagged" Template Literals
  - https://developers.google.com/web/updates/2015/01/ES6-Template-Strings#tagged_templates
  - https://leanpub.com/understandinges6/read#leanpub-auto-multiline-strings#leanpub-auto-tagged-templates
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_template_literals
  - http://exploringjs.com/es6/ch_template-literals.html#_implementing-tag-functions

Raw Strings
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Raw_strings

ECMAScript 2015 Specification Standard
http://www.ecma-international.org/ecma-262/6.0/#sec-template-literals

ECMAScript 2017 Draft
https://tc39.github.io/ecma262/#sec-template-literals


### Templates
The *HTML `<template>`* element is a mechanism for holding client-side content
that is not to be rendered when a page is loaded but may subsequently
be instantiated during runtime using JavaScript. 

Think of a template as a content fragment that is being stored for subsequent use in the document.
While the parser does process the contents of the <template> element while loading the page,
it does so only to ensure that those contents are valid; the element's contents are not rendered, however.


_Snippet cannot be run in console. Must save as HTML file_
```
<ul id='songs'>
</ul>

<template id='song'>
  <li></li>
</template>

<script defer>

let songs = ['Nothing else matters', 'Battery', 'One']

const template = document.querySelector ('template#song')
    , ul = document.querySelector ('ul#songs')
    , li = template.content.querySelector ('li')

for (let song in songs) {
  li.textContent = song
  songs.appendChild (li)
}

</script>
```

MDN
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template

HTML5
https://www.w3.org/TR/html5/scripting-1.html#the-template-element

Living Standard
https://html.spec.whatwg.org/multipage/scripting.html#the-template-element

HTML5 Rocks
https://www.html5rocks.com/en/tutorials/webcomponents/template


### DocumentFragment
AKA _"How did 'front-end frameworks' miss this?"_

The DocumentFragment has been proven to be the fastest method of updating DOM Tree.
The implementation was spec'd all the way back in DOM Level 1. We should be using this today!

The DocumentFragment interface represents a minimal document object that has no parent. It is used as a light-weight version of Document to store a segment of a document structure comprised of nodes just like a standard document. The key difference is that because the document fragment isn't part of the actual DOM's structure, changes made to the fragment don't affect the document, cause reflow, or incur any performance impact that can occur when changes are made.

DocumentFragments are DOM Nodes. They are never part of the main DOM tree. The usual use case is to create the document fragment, append elements to the document fragment and then append the document fragment to the DOM tree. In the DOM tree, the document fragment is replaced by all its children.

A common use for DocumentFragment is to create one, assemble a DOM subtree within it, then append or insert the fragment into the DOM using Node interface methods such as `appendChild()` or `insertBefore(). Doing this moves the fragment's nodes into the DOM, leaving behind an empty DocumentFragment. Because all of the nodes are inserted into the document at once, only one reflow and render is triggered instead of potentially one for each node inserted if they were inserted separately.

Since the document fragment is in memory and not part of the main DOM tree,
appending children to it does not cause page reflow (computation of element's position and geometry).
Consequently, using document fragments often results in better performance.

This interface is also of great use with Web components: `<template>` elements contain a `DocumentFragment` in their `HTMLTemplateElement.content property`.

See also `Document.createDocumentFragment` https://developer.mozilla.org/en-US/docs/Web/API/Document/createDocumentFragment

_[Console](https://developer.chrome.com/devtools#console) example snippet_
```Javascript
const browsers = ['Chrome', 'Edge', 'Brave', 'Firefox']
    , fragment = document.createDocumentFragment ()

browsers.forEach (name => {
  const li = document.createElement ('li')
  li.textContent = name
  fragment.appendChild (li)
})

document.querySelector ('ul')
  .appendChild (fragment)
```

- DOM Fragments - http://ejohn.org/blog/dom-documentfragments
- JavascriptDocumentFragment - https://davidwalsh.name/documentfragment

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


### Document.querySelector
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

### Document.querySelectorAll
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



### Node.textContent
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


### MutationObserver
Why? `MutationObserver` has comparable performance to `Proxy`.

```Javascript
let target = document.querySelector ('h1')
 
// create an observer instance
let callback = mutations =>
  mutations.forEach
    (mutation => console.log (mutation.type))

let observer = new MutationObserver (callback)
 
// configuration of the observer:
var config = { attributes: true, childList: true, characterData: true }
 
// pass in the target node, as well as the observer options
observer
  .observe (target, config)
 
target.textContent = 'Triggering mutation observer'

// later, you can stop observing
observer.disconnect()
```

_(shouts to @ebidel for this one)_
https://gist.github.com/ebidel/d923001dd7244dbd3fe0d5116050d227

Mutation Observer Tutorials
  - https://dev.opera.com/articles/mutation-observers-tutorial
  - https://tiffanybbrown.com/2013/09/mutation-observer

MDN
https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver

Living Standard
https://dom.spec.whatwg.org/#mutation-observers
https://dom.spec.whatwg.org/#mutationobserver

DOM Level 4
https://www.w3.org/TR/dom/#mutationobserver

### Rendering (Re-Flow, Re-Layout, Re-Paint)

Minimizing Browser Reflow - https://developers.google.com/speed/articles/reflow
https://www.phpied.com/rendering-repaint-reflowrelayout-restyle

![Rendering (Layout, Reflow, Repaint, & Redraw)](http://www.phpied.com/files/reflow/render.png)

* render tree - the visual part of the DOM tree
* nodes in the render tree are called frames or boxes
* recalculating parts of the render tree is called reflow (in Mozilla), and called layout in every other browser, it seems
* Updating the screen with the results of the recalculated render tree is called repaint, or redraw (in IE/DynaTrace)
* SpeedTracer introduces the notion of "style recalculation" (styles without geometry changes) vs. "layout"


10 ways to minimize reflows & improve performance
https://www.sitepoint.com/10-ways-minimize-reflows-improve-performance


### ~~MutationEvents~~ _(deprecated)_
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

#### Dependencies
  - [Tap](https://github.com/tapjs/node-tap)
  - [Browser Sync](https://browsersync.io/)
  - [jsdom](https://github.com/tmpvar/jsdom)

#### Notes
Custom Elements - https://toddmotto.com/web-components-concepts-shadow-dom-imports-templates-custom-elements/

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

#### Turbolinks
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
