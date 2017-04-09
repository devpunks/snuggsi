describe ('Element `tag-name`', _ => {
  it ('defines tag-name custom element in registry')
  it ('returns the custom element `tag-name` constructor')

  context ('when already defined', _ => {
    it ('returns existing custom element `tag-name` constructor')
  })
})

describe ('new Element `tag-name`', _ => {
  it ('initializes a new custom element by tag-name')
})

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

