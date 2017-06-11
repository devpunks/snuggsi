const
  root   = 'public'
, assets = require ('koa-static')
    (root, {defer: true})

, compressor = require ('./compressor.es')

module.exports = { compressor, assets }

