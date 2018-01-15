const
  { auth, security, compressor, librarian, mixins, assets }
    = require ('middleware')

, cors
    = require ('koa-cors') ({ methods: ['GET'] })


module.exports = class extends require ('koa') {

  constructor ( stack = [] ) {

    super ()

//    .use ( require ('koa-cors') ({ methods: ['GET'] }) )
//    .use ( security () )
//    .use ( compressor )
//    .use ( librarian )
//    .use ( negotiator )
//    .use ( mixins )
//    .use ( assets (path) )

    for (let middleware of stack)
      this.use (middleware)

    console.warn ('middleware', stack, this)
  }


  serve (path = '', port = process.env.PORT) {

    path = Boolean (path += '')
      ? path
      : 'public'


    return this
      // CHECK OUT CONNECT FOR MOUNTING MIDDLEWARE!!!!
      // https://github.com/senchalabs/connect#mount-middleware

      .listen ( port, _ => {

        console.warn (`Serving ${path}/`)
        console.warn ('Listening on port', port)
      })
  }
}
