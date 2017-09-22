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
    test.equal
      (response.statusCode, 200)

    test.end ()
  })

})

