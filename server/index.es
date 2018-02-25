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
    , root
        = assets ( Boolean (path += '') ? path : 'public' )

    return this
      .use (root)
      .listen ( port, _ => console.warn (message) )
  }
}
