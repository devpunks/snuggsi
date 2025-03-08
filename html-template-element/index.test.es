const { assert, test, describe, context, view } = require('../test')
  // The resulting document's URL will be a file:// URL,
, window = view ( 'html-template-element/index.test.html' )
, document = window.document
, source = document.scripts[0].src

describe ('Template', _=> {
  const
    template = document.querySelector `template[name=foo]`

  test ('EventTarget', _=> {
    console.log( document.documentElement.outerHTML )
    console.log( template )

    assert (true)
  }) // test
}) // describe

