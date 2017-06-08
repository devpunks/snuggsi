const
  dir = 'public'
, assets = require ('koa-static') (dir)
, compressor = require ('./compressor.es')

, headers = { }

module.exports = { compressor, assets }

