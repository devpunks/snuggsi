let
  document

, JSDOM =
    require ('jsdom').JSDOM

require ('./index.es')

const { test, beforeEach } = require ('tap')

beforeEach ((done) => {
  JSDOM
    .fromFile ('./index.test.html', { runScripts: 'dangerously', resources: 'usable' })
    .then (dom => (document = dom.window.document) && done ())
})

test ('foo', t => {
  t.equals (true, true)

  console.log ('Document', document.documentElement.outerHTML)

  t.done ()
})

