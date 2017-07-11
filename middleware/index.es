const
  root       = 'public'
, browser    = require ('./browser.es')
, compressor = require ('./compressor.es')
, mixins     = require ('../mixins/middleware.es')
, assets     = require ('koa-static') (root, {defer: true})

module.exports = { compressor, assets, mixins }

