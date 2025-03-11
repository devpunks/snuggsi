const
  { assert, test, describe, context, parse, view, browse } = require('../test')
, { document } = view `${__dirname}/index.test.html`
, dom = parse `${__dirname}/index.test.html`
, browser = browse `${__dirname}/index.test.html`

describe ('HTMLTemplateElement', _=> {
  const element = dom

  console.log('DA DOM!!!', element)

  test ( '.content', _=>
    assert ( true ) )

  describe ('<template name=… >', _=> {
    const template
      = document.querySelector `template[name=foo]`

    test ( '.content', _=>
      assert ( template.content ) )
  }) // describe
}) // describe

