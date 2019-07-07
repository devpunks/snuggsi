const
  { Server }
    = require ('snuggsi')

console.log ('Server', require('snuggsi'), Server)

//const server
//    = new Server


require ('tape')
  .onFinish (process.exit)

module.exports
  = server.serve.bind (server)
