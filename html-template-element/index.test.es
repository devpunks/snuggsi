const
  { assert, test, describe, context, view } = require('../test')
, { document } = view `${__dirname}/index.test.html`

describe ('Template', _=> {
  const
    template = document.querySelector
      `template[name=foo]`.content

  test ('.content', _=> {
    assert ( template.textContent )
  }) // test
}) // describe

