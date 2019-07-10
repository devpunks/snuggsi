require ('./polyfills')

const
  { SNUGGSI = '.' } = process.env


module.exports = {
  test  :
    require (`${SNUGGSI}/test`)

, read  :
    require (`${SNUGGSI}/read.es`)

, fetch :
    ( ... dependencies ) =>
      require ('node-fetch') ( ... dependencies )

, Resource : require (`${SNUGGSI}/resource`)
, Server   : require (`${SNUGGSI}/server`)
}
