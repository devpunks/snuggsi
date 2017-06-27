const {test} = require ('tape')

const
  jsdom = require ('jsdom')
  , dom = new JSDOM (`<!DOCTYPE html><p>Hello world</p>`);

console.log
  (dom.window.document.querySelector ('p').textContent)

test ('new Element', t => {

  t.equal (true, true)

  t.end ()
})

