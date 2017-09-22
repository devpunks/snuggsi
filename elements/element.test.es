const
  interface = 'index'
, { describe, serve, browse }
    = require ('test')


describe ('new Element', test => {
  const document = browse (interface)

  test.ok (document.querySelector `foo-bar`)

  test.end ()
})

