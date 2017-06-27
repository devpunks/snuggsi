const
  interface = 'element'
, {test, browse} = require ('./index.test.es')


test ('new Element', t => {

  const
    { window: {document}} = browse (interface)

  t.equal ('Element: Constructor', document.title)

  t.end ()
})

