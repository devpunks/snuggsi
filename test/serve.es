const
  { Server }
    = require ('snuggsi')

, server
    = new Server


module.exports
  = server.serve.bind (server)
