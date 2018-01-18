// *** WARNING!!! *** is causing deprecated generator warnings
//

const
  cors
    = require ('koa-cors')

, options
    = { methods: ['GET'] }


module.exports
  = cors (options)
