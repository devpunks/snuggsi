const
  methods
    = require ('http').METHODS


module.exports = path => {

  const Resource = require (path + '')

  console.log ('Requiring', require ('server/fixtures'))

  return function (context, next) {
    console.warn ('GETting resource from', path, context)
  }
}
