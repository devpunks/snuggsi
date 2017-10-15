const
  root       = 'public'
, browser    = require ('./browser')
, negotiator = require ('./negotiator')
, compressor = require ('./compressor')
, mixins     = require ('../mixins/middleware')
, assets     = require ('koa-static') (root, {defer: true})

module.exports =
  { negotiator, compressor, mixins, assets }

