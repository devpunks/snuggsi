// Web Resource
// https://en.wikipedia.org/wiki/Web_resource

module.exports = path =>

new class extends require (`${path}/index.es`) {

  constructor () {
    super ()
    console.warn ('Constructing extension')
  }

  get (context)
    { context.status = 200 }

  head (context)
    { context.status = 200 }

  options (context)
    { context.status = 200 }
}
