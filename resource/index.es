const
  METHODS = Array
    .from ( require ('http').METHODS )
    .map  ( method => method.toLowerCase () )


module.exports = (path) => {
  const
    resource = new class extends
      require (`${path}/index.es`) { }


  for (method of METHODS)
    !!!  (method in resource)
      && (resource [method] =

        function (method) {
          return (context, next) => {
            console.warn
              (method.toUpperCase (), 'is being called from base Resource')
          }
        } (method))


  console.log ('in', resource.subscribe,  !!! ('subscribe' in resource))

  return function (context, next) {
    const
      resource = new Resource
    , verb     = context.method
    , action   = resource [verb.toLowerCase ()]

    action (context, next)
    resource.subscribe ()
  }
}
