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
_Supports > Rails 5.x_
Add this to your Gemfile
```bash
gem "snuggsi"
```

Remove the following gems from Gemfile ([YAGNI](https://en.wikipedia.org/wiki/You_aren't_gonna_need_it))
```bash
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

## Contributing

1. Fork it ( https://github.com/[my-github-username]/snuggsi/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
