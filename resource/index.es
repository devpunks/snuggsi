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

  console.log ('WHAT', (new Resource).get ())
  console.log ('WHAT', (new Resource).subscribe ())

//(new Assigned)

//var
//  r = new Resource
//, s = (new )

     // .patch (context, next)

  return function (context, next) {

//  r [context.method.toLowerCase ()] ()
  }
}

