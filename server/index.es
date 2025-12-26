// https://expressjs.com/en/api.html
// https://github.com/expressjs/express/blob/master/lib/application.js


console.log ( 'SNUGGSI', process.env.SNUGGSI )
console.log ( 'server SNUGGSI', Object.keys ( require ( '../index.es' ) ) )


module.exports = class Server extends require ( 'koa' ) {

  constructor ( middleware = [] ) { super ()

    for ( let slice of
      [ snuggsi
        , cors        // why is this NOT a function
        , security `` // ...and this IS a function?
        , ... middleware
      ] ) this.use ( slice )
  } // constructor


  serve ( path = process.env.pwd, port = process.env.PORT || 2000 ) {

    const
      message
        = `\n📚  Serving ${path}/ on port ${port}\n`
//  , root
//      = assets ( Boolean (path += '') ? path : 'public' )

    return this
//    .use (root)
      .listen ( port, _ => console.warn ( message ) )
  } // serve
} // class
