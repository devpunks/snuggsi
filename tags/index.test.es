// http://exploringjs.com/es6/ch_template-literals.html#_implementing-tag-functions

const jsdom  = require (`jsdom`)
const {test} = require (`tap`)

const tag = require (`./index.es`)

let id = `1234567890`
let alias = `TaraTrouble`
let context = {foo: 'bar', 'baz': 'bat'}

test (`tag`, t => {
  let p =




  tag `
    <p id="${id}">Hello ${alias}!</p>
  `

  (context)

  // tag (context) `<p>${alias}</p>`
  // p (context) `Hello ${alias}`






  t.done ()
  console.log (`paragraph`, p)
})
