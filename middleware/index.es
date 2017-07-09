const
  root   = 'public'
, browser= require ('./browser.es')
, assets = require ('koa-static')
    (root, {defer: true})

, compressor = require ('./compressor.es')

module.exports = { compressor, assets }

