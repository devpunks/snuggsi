const
  { cors, security, snuggsi, negotiator, assets }
    = require ( '../middleware' )


console.log ( 'server SNUGGSI', Object.keys ( require ( '../index.es' ) ) )
console.log ( 'SNUGGSI', process.env.SNUGGSI )


module.exports = class extends require ('koa') {

  constructor ( middleware = [] ) { super () 

    for (let slice of [
      cors        // why is this NOT a function
    , security `` // ...and this IS a function?
    , ... middleware
    , snuggsi
    ]) this.use (slice)
  }


  serve (path = '', port = process.env.PORT) {

    const
      message
        = `\n📚  Serving ${path}/ on port ${port}\n`
    , root
        = assets ( Boolean (path += '') ? path : 'public' )

    return this
      .use (root)
      .listen ( port, _ => console.warn (message) )
  }
}
