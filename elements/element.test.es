const
  interface = 'index'
, {test: describe, browse} = require ('./index.test.es')


describe ('new Element', test => {

  const document = browse (interface)

console.log (document.documentElement.outerHTML)
  test.ok (document.querySelector ('foo-bar'))

  test.end ()
})

