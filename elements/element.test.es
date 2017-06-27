const
  {test} = require ('tape')
, path = `${__dirname}/element.html`
, read = require ('fs').readFileSync

, {JSDOM} = require ('jsdom')

//, html = read (__dir)
, dom = new JSDOM (read (path, 'utf8'))

console.log
  ('\n\n', dom.window.document.title, '\n\n')

test ('new Element', t => {

  t.equal (true, true)

  t.end ()
})

