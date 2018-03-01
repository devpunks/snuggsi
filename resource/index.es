const
  METHODS = Array
    .from ( require ('http').METHODS )
    .map  ( method => method.toLowerCase () )

, define = function (property) {
    const
      writable = false

    , value =
        (context, next) => console.warn
          // 405 Method Not Allowed
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
          ( method.toUpperCase (), 'being called from derived Resource', context.throw (405) )


    return Object.defineProperty
      ( this, property, { value, writable } )
  }


module.exports = (path) => {
  const
    resource = new class extends
    require (`${path}/index.es`) {

      constructor () {
        super ()
        console.warn ('Constructing extension')
      }
    }


  for    ( method of METHODS )
    !!!  ( method in resource )
      && ( method in define.call (resource, method) )


  void // to give you a moment to think about what just happened ...


  return async function (context, ... _ ) {
    const
    { method } = context
    // should be binding however
    // must understand implications
    // of being able to call an action within an action.
    , endpoint = resource [ method.toLowerCase () ]

    resource.subscribe (context)
    await endpoint ( context, ... _ )
  }
}
