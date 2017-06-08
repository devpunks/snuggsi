const
  root = 'public'

, headers = { }

, assets = require ('koa-static')
    (root, {defer: true})

, compressor = require ('./compressor.es')

module.exports = { compressor, assets }

