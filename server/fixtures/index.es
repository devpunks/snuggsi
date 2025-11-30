module.exports =

class {

  constructor () {
    console.warn ('This CAN be called from initialization')
  } // constructor

  static foo (context) {
    console.warn ('THIS SHOULD NEVER GET CALLED!!', context)
  } // foo

  put (context) {
    console.warn ('Wow this is really PUTing!', context)
  } // put

  patch (context) {
    console.warn ('Wow this is really PATCHing!', context.params)
    console.warn ('This', context.body = 'SHAZAAAAAM!!!!')
  } // patch

  post (context) {
    console.warn ('Wow this is really POSTing!', context)
  } // post

  delete (context) {
    console.warn ('Wow this is really DELETEing!', context)
  }
}
