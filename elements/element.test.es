const
  {test} = require ('tape')
, read = require ('fs').readFileSync

, {JSDOM} = require ('jsdom')

//, html = read (__dir)
, dom = new JSDOM (`<!DOCTYPE html><p>Hello world`)

console.log (read(`${__dirname}/element.html`, 'utf8'))
console.log
  ('\n\n', dom.window.document.documentElement.outerHTML, '\n\n')

test ('new Element', t => {

  t.equal (true, true)

  t.end ()
})

