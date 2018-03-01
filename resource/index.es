const
  methods
    = require ('http').METHODS


module.exports = path => {

  const Resource = require (`${path}/index.es`)

  return function (context, next) {
    (new Resource).patch ()

    console.warn ('GETting resource from', path, context)
  }
}
