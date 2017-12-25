// ONLY KILL KEEP-ALIVE WHEN
const
  { compressor, mixins, assets }
    = require ('middleware')

, http
    = require ('http')


server
    = new (require ('koa'))

module.exports = class {

  constructor () {
    server = http.createServer ((req, res) => {
      console.log ('server: request incoming')
      res.writeHead (205, {'Content-Type': 'application/snuggs'})
      res.end ('foo bar')
    })
  }


  serve (path, port = process.env.PORT) {

    console.warn ( assets (path) )

    return server

//    .use ( require ('koa-cors') ({ methods: ['GET'] }) )

//    .use ( compressor )

//    .use ( mixins )

//    .use ( assets (path) )

      .listen ( port, _ => {

        console.warn ('Serving', path + '')
        console.warn ('Listening on port', port)
      })
  }
}
