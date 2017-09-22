const
  { describe, serve, browse }
    = require ('test')

const
  // https://nodejs.org/api/http.html#http_http_request_options_callback
  options = {
    /*, host: 'localhost' // default */
    port    : 8080
  , method  : 'GET'
  , headers : {
      'Accept': '*/*'
    }
  , path: '/'
  }

describe ('new Element', test => {
  request = require ('http').get (options, response => {
  //console.warn (response.headers)
    test.end ()
  })
})

