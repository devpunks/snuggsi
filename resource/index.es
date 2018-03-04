// Web Resource
// https://en.wikipedia.org/wiki/Web_resource

module.exports = path =>

new class extends require (`${path}/index.es`) {

  constructor () {
    super ()
    console.warn ('Constructing extension', path)
  }

  options (context)
    // should be done by CORS
    { context.status = 200 }

  head (context)
    { context.status = 200 }

  get (context)
    { context.status = 200 }
}
