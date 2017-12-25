// ONLY KILL KEEP-ALIVE WHEN
const
  { compress, mixins, assets }
    = require ('middleware')

, http
    = require ('http')


server
    = new (require ('koa'))





module.exports = class {

  constructor () {
    server = http.createServer ((req, res) => {
      console.log ('server: request incoming')
      res.writeHead (205, {'Content-Type': 'application/ecmascript'})
      res.end ('foo bar')
    })

    .on ('connection', connection => {
      console.warn ('connection', this, connection)

      connection.on
        ('close', a => { console.warn ('closing connection'); server._handle.close(); server._handle = null })
    })
  }


  serve (path, port = process.env.PORT) {

    server = server

//    .use ( require ('koa-cors') ({ methods: ['GET'] }) )

//    .use ( compress )

//    .use ( mixins )

//    .use ( assets )

       .listen ( port, function () {
         console.warn ('Listening on port', port)
       })
  }


  shutdown (code = 0) {
    console.warn ('closing server')
    server.close ()
    process.exit ()
  }
}
