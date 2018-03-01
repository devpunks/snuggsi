const
  METHODS = Array
    .from ( require ('http').METHODS )
    .map  ( method => method.toLowerCase () )



module.exports = path => {

  const Resource = require (`${path}/index.es`)

  return function (context, next) {
//  (new Resource).patch (context, next)

    console.warn ('GETting resource from', path, context)
  }
}

class Resource {

}

for (method of METHODS)
  console.warn (method)
