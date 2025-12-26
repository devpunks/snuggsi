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


export default class extends Server {

  #middleware

  settings = Object.create ( null )

  constructor () {
    const mime = MIME_TYPES.txt //|| MIME_TYPES.default;

    super ( async ( request, response ) =>
      this.log ( 'Hello from custom server constructor!' ) )


    // Set a specific timeout for this request (e.g., 10 seconds)
    // request.setTimeout(10000, () => {
    //   response.status(408).send( 'Request timeout occurred' ) // Send a 408 error
    //   request.socket.destroy () // Close the socket
    // });

    this.timeout = 2000 // ms
    this.keepAlive = true // true
    this.requestTimeout = 1000 // ms
    this.keepAliveTimeout = 3000 // ms

    this.maxHeadersCount = 2
    this.headersTimeout = 500 // ms
    this.maxHeaderSize = 4096 // 413 Entity Too Large | 431 Request Header Fields Too Large. 

    this.maxRequestsPerSocket = 1
    

    // Add custom properties
    this.settings.foo = 'bar'
    this.customSetting = 'some value'

    for ( let slice of [ // snuggsi
//    , log
//    , cors // why is this NOT a function?
//    , auth // TODO
//    , secure `` // why is this a function?
//    , negotiate // TODO

//    , ... middleware

//    , head // TODO

//    , body // TODO

        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching
//    , cache // TODO: Expires, Cache-Control, Etag, If-Match, If-Non-Match
//    , static // TODO: resolve static assets local and remote (see `cache`)

        // https://en.wikipedia.org/wiki/Chunked_transfer_encoding
        // https://nodejs.org/api/http.html#outgoingmessageaddtrailersheaders
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/TE
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Encoding
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Transfer-Encoding
//    , encode
//    , stream // TODO: file.stream.pipe ( ressponse )
//    , connect // TODO (web)sockets, UDP, WebRTC, RTMP, QUIC

        // https://nodejs.org/api/http.html#outgoingmessageaddtrailersheaders
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Trailer
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Server-Timing
//    , benchmark // https://w3c.github.io/server-timing/#the-server-timing-header-field

      log ( 'foo.log' )
    ] ) this.use ( slice )

    this
      .on ( 'request', this.handle )
      .on ( 'request', this.candle )

    console.log ( this )
    this.log ( `Server Environment: ${ process.env.NODE_ENV || 'development' }` )
  } // constructor


  use ( middleware ) {
    console.log ( 'Loading middleware', middleware.name, middleware )
    console.log ( 'Params', middleware.length )

    return this.on ( 'request', middleware )
  } // use

  async handle ( request, response ) {
    this.log ( `${request.url} - Handle` )

    console.log ( response.constructor )
    response.statusCode = 200
    response.setHeader ( 'Content-Type', 'dev/punks' )
  } // handle


  async candle ( request, response ) {
    this.log ( `Candleing request for ${request.url} with setting: ${this.customSetting}` )
    response.statusCode = 200
//  response.strictContentLength = true
    response.setHeader ( 'Content-Type', MIME_TYPES.json )
    response.end ('[' +
      '"SERVER",' + JSON.stringify ( this ) + ',' +
      '"REQUEST Headers",' + JSON.stringify ( request.headers ) + ',' +
      '"RESPONSE Headers",' + JSON.stringify ( response.getHeaders () ) +
    ']')
  } // candle


  serve ( path = process.env.PWD ) { // check for directory existence
    const banner = '📚  Serving: ' + ( path || 'public' ) + '/'
//  , root   = assets ( Boolean ( path += '' ) ? path : 'public' )

    this.log ( banner )

    return this
//    .use (root)
      .listen ( port, _ => console.warn ( message ) )
  } // serve
} // class
