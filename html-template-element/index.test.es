const { assert, test, describe, context, view } = require('../test')
  // The resulting document's URL will be a file:// URL,
, window = view ( 'html-template-element/index.test.html' )
, document = window.document
, source = document.scripts[0].src

describe ('Template', _=> {
  const
    window = view ( url )
  , source = window.document.scripts[0].src

  test ('EventTarget', _=> {
    console.log( window.document.documentElement.outerHTML )

    assert (true)
  }) // test
}) // describe

