const
  { cors, security, snuggsi, negotiator, assets }
    = require ('middleware')


module.exports = class extends require ('koa') {

  constructor ( stack = [] ) {

    super ()

    // Mounting Middleware
    // https://github.com/koajs/mount
    // https://github.com/senchalabs/connect#mount-middleware

    stack = [
      cors        // why is this not a function...
    , security () // and this IS a function?
//  , snuggsi
//  , ... stack
    , negotiator
    ]
      .map ( this.use.bind (this) )
  }


  serve (path = '', port = process.env.PORT) {

    const
      message
        = `Serving ${path}/ on port ${port}`


    return this

      .use ( assets ( Boolean (path += '') ? path : 'public' ) )

      .listen ( port, _ => console.warn (`Serving ${path}/ on port`, port) )
  }
}
