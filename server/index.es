// ONLY KILL KEEP-ALIVE WHEN
const
  { compress, mixins, assets }
    = require ('middleware')

, http
    = require ('http')


server
    = new (require ('koa'))

server = http.createServer ((req, res) => {
  console.log ('server: request incoming', this)
  res.writeHead (205, {'Content-Type': 'application/ecmascript'})
  res.write ('foo')
  res.end ('bar')
})


server.on ('connection', connection => {
  console.warn ('connection', this, connection)

  connection.on ('close', a => {
    console.warn ('closing connection', a)
  })
})

server.listen (8181)












module.exports = class {

  listen (port) {

    this.port = port || 8080

    console.warn ('server.close', server.close)
    console.warn ('server.socketIdleTimeout', server.socketIdleTimeout)

    return this
  }


  serve (path) {

    server = server

//    .use ( require ('koa-cors') ({ methods: ['GET'] }) )

//    .use ( compress )

//    .use ( mixins )

//    .use ( assets )

//    .listen ( this.port )
  }


  destroy ()
    { console.warn (server.close) }
}
