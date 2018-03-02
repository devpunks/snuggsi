// Web Resource
// https://en.wikipedia.org/wiki/Web_resource

module.exports = path => {
  const
    resource = new class extends
    require (`${path}/index.es`) {

      constructor () {
        super ()
        console.warn ('Constructing extension')
      }
    }


//for    ( method of METHODS )
//  !!!  ( method in resource )
//    && ( method in define.call (resource, method) )


  void null // to give you a moment to think about what just happened ...


  return resource

//return async function (context, ... _ ) {
//  const
//  { method } = context
//  // should be binding however
//  // must understand implications
//  // of being able to call an action within an action.
//  , endpoint = resource [ method.toLowerCase () ]

//  resource.subscribe (context)
//  await endpoint ( context, ... _ )
//}
}
