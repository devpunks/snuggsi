const
  METHODS = Array
    .from ( require ('http').METHODS )
    .map  ( method => method.toLowerCase () )


module.exports = path => {

  var Resource = class extends require (`${path}/index.es`) { }

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
    , verb     = context.method
    , action   = resource [verb.toLowerCase ()]

    action (context, next)
    resource.subscribe ()
  }
}
