const
  { auth, cors, security, policy, compressor, snuggsi, negotiator, librarian, mixins, assets }
    = require ('middleware')


module.exports = class extends require ('koa') {

  constructor ( middleware = [] ) { super () 

    for (let slice of [
      cors        // why is this NOT a function...
    , security `` // and this IS a function?
    , policy ()   // and this IS a function?
    , ... middleware
    , snuggsi
    ]) this.use (slice)
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
