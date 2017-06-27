const {test, beforeEach} = require ('tape')


const jsdom = require (`jsdom`)
let document, window

//const Element = require (`./index.es`).Element
//const subject = new Element (`foo`)

//beforeEach ((done) => {
//  console.log (`This is before`)
//  document = jsdom.jsdom ()
//  window = document.defaultView
//  done ()
//})

test ('new Element', function (t) {
  t.equal (true, true)

  t.end ()
})

