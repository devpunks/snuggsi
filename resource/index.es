const
  METHODS = Array
    .from ( require ('http').METHODS )
    .map  ( method => method.toLowerCase () )



module.exports = path => {

//const Resource = require (`${path}/index.es`)


  return function (context, next) {
//  (new Resource).patch (context, next)

    console.warn ('GETting resource from', path, context)
  }
}

var Resource = class { }

for (method of METHODS)
  Resource.prototype [method] =
    function () {
      return (context, next) => {
        console.warn ('This is being called from base Resource')
      }
    } (method)
