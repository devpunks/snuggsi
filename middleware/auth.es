const
  auth = require ('basic-auth')


module.exports = options =>

  async (context, next) => {

    console.warn ('Im lockin you out bitch', options, auth (context) )

    const
      { name , pass:password }
        = auth (context)


    return name == options.name
      && (password == options.password)
      && await next ()

//  : (context.set ('WWW-Authenticate', 'Basic')
//    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/WWW-Authenticate
//    // WWW-Authenticate: Basic realm="Access to the staging site", charset="UTF-8"
//    && context.throw (401))
  }
