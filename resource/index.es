const
  METHODS = Array
    .from ( require ('http').METHODS )
    .map  ( method => method.toLowerCase () )


module.exports = path => {

  var User = require (`${path}/index.es`)

  var Resource = class extends User { }

for (method of METHODS)
  !!!   Resource.prototype [method]
    && (Resource.prototype [method] =

      function (method) {
        return (context, next) => {
          console.warn
            (method.toUpperCase (), 'is being called from base Resource')
        }
      } (method))


  return function (context, next) {
    const
      resource = new Resource
    , verb     = context.method.toLowerCase ()
    , action   = resource [verb]

    action (context, next)
    resource.subscribe ()
  }
}
