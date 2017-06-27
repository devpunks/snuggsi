const {test} = require ('tape')

const
  {JSDOM} = require ('jsdom')
  , dom = new JSDOM (`<!DOCTYPE html><p>Hello world`);

console.log
  ('\n\n', dom.window.document.documentElement.outerHTML, '\n\n')

test ('new Element', t => {

  t.equal (true, true)

  t.end ()
})

