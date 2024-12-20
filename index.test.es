const { view, assert, test, describe, context } = require('./test'),
  // The resulting document's URL will be a file:// URL,
  url = 'index.test.html'
, window = view (url)

describe ('scripts', _=> {
  const
    source = window.document.scripts[0].src

  test ('<script> source', _=> {
//  await window.customElements.whenDefined('foo-bar')

    console.log( window.document.documentElement.outerHTML )

    assert (source === 'https://unpkg.com/snuggsi')
  }) // test
}) // describe

