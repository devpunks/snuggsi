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

    console.warn ('assets', assets)

    server = server

//    .use ( require ('koa-cors') ({ methods: ['GET'] }) )

//    .use ( compressor )

//    .use ( mixins )

//    .use ( assets )

       .listen ( port, function () {

         console.warn ('Serving', path + '')
         console.warn ('Listening on port', port)
       })
  }
}
