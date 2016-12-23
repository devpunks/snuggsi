const test = require (`tap`).test
const jsdom = require (`jsdom`)

const Element = require (`./elements/index.es`)

console.log (`snuggsi: This is only the beginning!`)

const subject = new Element (`foo`)

test (`new Element`, t => {
  console.log (`Mainin:`, Element.Main)
  t.doesNotThrow (_ => { new Element (`foo`) })

  t.throws (_ => { new Element })

  t.done ()
})
