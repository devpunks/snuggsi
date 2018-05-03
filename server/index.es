const
  { cors, security, snuggsi, negotiator, assets }
    = require ('middleware')


module.exports = class extends require ('koa') {

  constructor ( middleware = [] ) {
    super ()

    void [
      cors        // why is this NOT a function...
    , security () // and this IS a function?
//  , negotiator
    ]
    .concat (middleware, snuggsi)
    .map (this.use.bind (this))
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
