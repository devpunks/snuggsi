// https://expressjs.com/en/api.html
// https://github.com/expressjs/express/blob/master/lib/application.js

const { PORT=8888, SNUGGSI='.' } = process.env

console.log ( 'PORT', PORT)
console.log ( 'SNUGGSI', SNUGGSI )
//const
//  { cors, security, snuggsi, negotiator }
//    = require ( '../middleware/index.es' )

import log from './logger.js'
import * as fs from 'node:fs'
import { Server } from 'node:http'
import * as path from 'node:path'

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
