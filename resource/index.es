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

      get (context)
        { context.response.status = 200 }

      head (context)
        { context.response.status = 200 }

      options (context)
        { context.response.status = 200 }
    }

  return resource
}
