require ('./polyfills')

const
  { SNUGGSI = '.' } = process.env


  console.log ('index SNUGGSI', SNUGGSI)

module.exports = {
  test  :
    require (`${SNUGGSI}/test`)

, read  :
    require (`${SNUGGSI}/read.es`)

, fetch :
  // supertest - https://github.com/visionmedia/supertest
    ( ... dependencies ) =>
      require ('node-fetch') ( ... dependencies )

, Resource : require (`${SNUGGSI}/resource`)
, Server   : require (`${SNUGGSI}/server`)
}
