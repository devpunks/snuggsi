const
  { Server }
    = require ('snuggsi')

console.log ('Server', require('snuggsi'), Server)

const server
    = new Server


module.exports
  = server.serve.bind (server)
