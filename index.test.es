const jsdom = require (`jsdom`)
let document, window

const Element = require (`./index.es`).Element

const {test, beforeEach} = require (`tap`)

const subject = new Element (`foo`)

beforeEach ((done) => {
  console.log (`This is before`)
  document = jsdom.jsdom ()
  window = document.defaultView
  done ()
})

test (`new Element`, t => {
  console.log (`Mainin:`, Element.Main)
  document.body.appendChild ( document.createElement (`x-snuggs`))
  console.log (document.documentElement.outerHTML)
  console.log (`registerElement`, document.registerElement)
  console.log (`customElements`, window.customElements)

  t.doesNotThrow (_ => { new Element (`foo`) })

  t.throws (_ => { new Element })

  t.done ()
})

