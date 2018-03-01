module.exports =

class {

  get (context) {
    console.warn ('Wow this is really GETing!', context)
  }
}

  put (context) {
    console.warn ('Wow this is really PUTing!', context)
  }

  patch (context) {
    console.warn ('Wow this is really PATCHing!', context)
  }

  post (context) {
    console.warn ('Wow this is really POSTing!', context)
  }
}
