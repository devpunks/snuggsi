# Snuggsi
Sane Client Components

## Testing
"Update April 2016: since writing this post, I've moved to using tap which spawns individual processes for each test file, so I don't need this approach at all now."

- https://remysharp.com/2015/12/14/my-node-test-strategy
- https://remysharp.com/2016/02/08/testing-tape-vs-tap

### Running
```bash
$ npm test
```

## Installation

Add this line to your application's Gemfile:

### Node
```bash
$ npm install snuggsi
```

### Ruby
[![Gem Version](https://badge.fury.io/rb/snuggsi.svg)](http://badge.fury.io/rb/snuggsi)

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

ActionController::API
  - https://github.com/rails/rails/pull/19832

#### Configuring Rails Assets
  - configuring-assets

#### Why a New Asset Pipeline ?
  - https://corcoran.io/2014/05/27/moving-past-rails-asset-pipeline/

Add this to your Gemfile
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

### Deployment to Heroku
https://github.com/sass/sassc-rails

Due to LibSass compilation requirements, you must upgrade to the
[Heroku Cedar-14 Stack](https://devcenter.heroku.com/articles/cedar-14-migration)
in order to successfully install this gem.

Upgrading to Cedar-14 is usually a painless process.


#### Notes
DOM Levels
  - https://developer.mozilla.org/fr/docs/DOM_Levels

Default Raw template handling
  - https://github.com/rails/rails/commit/8bea607265a2c9bb9bb2188b0a79089ca373b814

  - https://github.com/rails/rails/commit/4be859f0fdf7b3059a28d03c279f03f5938efc80

Template lookup for I18n
  - https://github.com/rails/rails/commit/ecb1981b

## Contributing

1. Fork it ( https://github.com/[my-github-username]/snuggsi/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
