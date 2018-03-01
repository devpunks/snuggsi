const
  METHODS = Array
    .from ( require ('http').METHODS )
    .map  ( method => method.toLowerCase () )


module.exports = path => {

  var
    r = new Resource
  , s = (new require (`${path}/index.es`))

     // .patch (context, next)

  console.log ('s', s)

  return function (context, next) {

    r [context.method.toLowerCase ()] ()
  }
}

var Resource = class { }

for (method of METHODS)

  Resource.prototype [method] =
    function (method) {
      return (context, next) => {
        console.warn (method.toUpperCase (), 'is being called from base Resource')
      }
    } (method)
