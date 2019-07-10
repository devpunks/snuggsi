require ('./polyfills')

const
  { SNUGGSI = '.' } = process.env


module.exports = {
  Resource : require (`${SNUGGSI}/resource`)
, Server   : require (`${SNUGGSI}/server`)
, test     : require (`${SNUGGSI}/test`).test

, fetch    :
    ( resource, ... options ) =>
      require ('node-fetch') (resource, ... options)

, read     :
    require (`${SNUGGSI}/read.es`)
}
