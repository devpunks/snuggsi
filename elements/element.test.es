const
  {test} = require ('tape')
, browse = require ('./index.test.es')


, interfaces = ['element']

//console.log
//  ('\n\n', dom.window.document.title, '\n\n')

test ('new Element', t => {

  const
    { window: {document}} = browse ('element')

  t.equal ('Element: Constructor', document.title)

  t.end ()
})

