# Testing

## Running Test Coverage
```bash
$ snuggsi test && snuggsi cover && snuggsi weight
```

## `snuggsi test`
Run entire test suite.

## `snuggsi cover`
Test coverage of libraries.

## `snuggsi weigh`
Run weight check on final distribution.

## References
  - Introduction - http://web-platform-tests.org/introduction.html
  - [TAP Testing Protocol](https://testanything.org)
  - [Node test runner _(>= v18.x)_](https://nodejs.org/api/test.html)
  - [JSDOM](https://github.com/tmpvar/jsdom)
  - [Puppeteer](https://github.com/puppeteer/puppeteer)
    - [Add custom element support](https://github.com/jsdom/jsdom/pull/2548)
    - [Support for WebComponents API](https://github.com/jsdom/jsdom/issues/1030)
    - [Make `Attr` extend from `Node` _(again...)_](https://github.com/jsdom/jsdom/issues/1641)
    - [JSDOM (context per test)](https://github.com/jsdom/jsdom/wiki/Don%27t-stuff-jsdom-globals-onto-the-Node-global)
  - [w3c/web-platform-tests/custom-elements](https://github.com/w3c/web-platform-tests/tree/master/custom-elements)

## Tutorials
  - [Custom Elements Everywhere](https://custom-elements-everywhere.com)
  - [Test The Web Forward Seattle by Kris Krueger](http://w3.org/html/wg/wiki/images/b/b6/Testharness.pdf)
  - [using-testharness.js by Robin Berjon](http://darobin.github.com/test-harness-tutorial/docs/using-testharness.html)
  - [web-platform-tests testharness.js documentation](http://web-platform-tests.org/writing-tests/testharness-api.html)
