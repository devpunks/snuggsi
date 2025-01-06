const { assert, test, describe, context, view } = require('../test'),
  // The resulting document's URL will be a file:// URL,
  url = 'event-target/index.test.html'

describe ('EventTarget', _=> {
  const
    window = view (url)
  , source = window.document.scripts[0].src

  test ('EventTarget', _=> {
    console.log( window.document.documentElement.outerHTML )

    assert (true)
  }) // test
}) // describe
