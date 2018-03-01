const
  methods
    = require ('http').METHODS


module.exports = path => {

  require (path + '')

  return function (context, next) {
    console.warn ('GETting resource from', path, context)
  }
}
