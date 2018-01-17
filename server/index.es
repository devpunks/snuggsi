const
  { auth, security, compressor, librarian, mixins, assets }
    = require ('middleware')

, cors // is causing deprecated generator warnings
    = require ('koa-cors') ({ methods: ['GET'] })


module.exports = class extends require ('koa') {

  constructor ( stack = [] ) {

    super ()

//  stack = [
//    cors
//  , security ()
//  ,/* librarian, negotiator, mixins */
//  ].concat ( stack )

    for (let middleware of stack)
      this.use (middleware)

    console.warn (this.middleware)

  }


  serve (path = '', port = process.env.PORT) {

    console.warn ('About to serve this bitch up')

    this
      .use ( assets (Boolean (path += '') ? path : 'public') )
      .use ( compressor )


    return this
      // CHECK OUT CONNECT FOR MOUNTING MIDDLEWARE!!!!
      // https://github.com/senchalabs/connect#mount-middleware

      .listen ( port, _ => {

        console.warn (`Serving ${path}/`)
        console.warn ('Listening on port', port)
      })
  }
}
