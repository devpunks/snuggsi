# Snuggsi
Sane Client Components

## DSL
### [TextContent](/elements/text-content.js)

Relayed text content mutations

Copy & pasta contents from the following link into developer console.

_✅  No worries! No foolishness here !_
https://raw.githubusercontent.com/snuggs/snuggsi/master/elements/text-content.js

### [State](/state.js)

How to manage state over time.

### [Attribute](/elements/attribute.js)
Living Standard ([Web IDL](/elements/attribute.idl))

Attribute binding relay

### [Attributes](/elements/attributes.js)

Attributes named node map.

### [Template](/elements/attributes.js)

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
#### TextContent
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

DOM Levels
  - https://developer.mozilla.org/fr/docs/DOM_Levels

Default Raw template handling
  - https://github.com/rails/rails/commit/8bea607265a2c9bb9bb2188b0a79089ca373b814

  - https://github.com/rails/rails/commit/4be859f0fdf7b3059a28d03c279f03f5938efc80

Template lookup for I18n
  - https://github.com/rails/rails/commit/ecb1981b


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

This README would normally document whatever steps are necessary to get the
application up and running.

_Supports > Rails 5.x_
If you’re lucky enough to be starting with a brand new application, you can use the `--skip-sprockets` option when you create the app.

```bash
$ rails new AwesomeApp --skip-sprockets # 🎉Yay🎉
```

Relies on ActionController::Renderer to render templates
  - https://github.com/rails/rails/pull/18546
  - http://guides.rubyonrails.org/5_0_release_notes.html#action-pack-notable-changes

#### Turbolinks - https://gist.github.com/snuggs/f24303a6d3ce584e7582672f8b40c54f
 - Dom Fragments - http://ejohn.org/blog/dom-documentfragments/

#### Configuring Rails Assets
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
