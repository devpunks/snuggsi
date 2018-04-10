module.exports =

class {

  constructor () {
    console.warn ('This CAN be called from initialization')
  }

  get (context) {
    console.warn ('Holy mother of God')
    context.body = 'SHAZAAAM!'
  }

  put (context) {
    context.status = 200
    console.warn ('Wow this is really PUTing!', context.method)
  }

  patch (context) {
    context.status = 200
    console.warn ('Wow this is really PATCHing!', context.method)
  }

  post (context) {
    context.status = 200
    console.warn ('Wow this is really POSTing!', context.method)
  }

  delete (context) {
    context.status = 200
    console.warn ('Wow this is really DELETEing!', context.method)
  }
}
