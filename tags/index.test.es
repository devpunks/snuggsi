// http://exploringjs.com/es6/ch_template-literals.html#_implementing-tag-functions

const jsdom  = require (`jsdom`)
const {test} = require (`tap`)

const tag = require (`./index.es`)

test (`tag`, t => {
  let id = `1234567890`
  let alias = `TaraTrouble`
  let context = {foo: 'bar', 'baz': 'bat'}

  let p = tag `
    <p id="${id}">Hello ${alias}!</p>
  `
  (context)

  console.log (`paragraph`, p)

  t.done ()
})
