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

const MIME_TYPES = { // TODO: `negotiate`
  css: 'text/css',
  gif: 'image/gif',
  png: 'image/png',
  jpg: 'image/jpeg',
  ico: 'image/x-icon',
  svg: 'image/svg+xml',
  js: 'text/javascript',
  json: 'application/json', // https://datatracker.ietf.org/doc/html/rfc8259
  txt: 'text/plain; charset=UTF-8',
  html: 'text/html; charset=UTF-8',
  default: 'application/octet-stream',
}

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
