const
  { assert, test, describe, context, view } = require('../test')
, { document } = view `${__dirname}/index.test.html`

describe ('Template', _=> {
  const
    template = document.querySelector
      `template[name=foo]`

  test ('.content', _=> {
    assert(template.content.textContent)

    console.log( 'TEST', document.documentElement.outerHTML )
  }) // test
}) // describe

