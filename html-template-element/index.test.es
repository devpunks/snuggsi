const
  { assert, test, describe, context, view } = require('../test')
, { document } = view `${__dirname}/index.test.html`

describe ('Template', _=> {
  const
    template = document.querySelector
      `template[name=foo]`.content

  test ('EventTarget', _=> {
    console.log( document.documentElement.outerHTML )
    console.log( template )

    assert (true)
  }) // test
}) // describe

