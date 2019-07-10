require ('./polyfills')

const
  { SNUGGSI = '.' } = process.env


module.exports = {
  test  :
    require (`${SNUGGSI}/test`)

, read  :
    require (`${SNUGGSI}/read.es`)

, fetch :
    ( resource, ... options ) =>
      require ('node-fetch') (resource, ... options)

, Resource : require (`${SNUGGSI}/resource`)
, Server   : require (`${SNUGGSI}/server`)
}
