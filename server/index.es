const
  { auth, security, compressor, librarian, mixins, assets }
    = require ('middleware')

, cors // is causing deprecated generator warnings
    = require ('koa-cors') ({ methods: ['GET'] })


module.exports = class extends require ('koa') {

  constructor ( stack = [] ) {

    super ()

    stack = [
      cors        // why is this not a function...
    , security () // and this IS a function?
    ].concat ( stack )

    for (let middleware of stack)
      this.use (middleware)
  }


  serve (path = '', port = process.env.PORT) {

    ,/* librarian, negotiator, mixins */
    this
      .use ( compressor )
      .use ( assets ( Boolean (path += '') ? path : 'public' ) )


    return this
      // CHECK OUT CONNECT FOR MOUNTING MIDDLEWARE!!!!
      // https://github.com/senchalabs/connect#mount-middleware

      .listen ( port, _ => {

        console.warn (`Serving ${path}/`)
        console.warn ('Listening on port', port)
      })
  }
}
