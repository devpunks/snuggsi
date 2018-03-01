const
  METHODS = Array
    .from ( require ('http').METHODS )
    .map  ( method => method.toLowerCase () )


module.exports = path => {

  var User = require (`${path}/index.es`)

  console.log ('User', User.prototype, User)

  console.log ('Resource', Resource.prototype, User)

  var Assigned = Object.assign (Resource, User.prototype)

  console.log ('Assigned', Object.getOwnPropertyNames (Assigned))

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
