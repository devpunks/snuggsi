const
  auth = require ('basic-auth')


module.exports = options =>

  async (context, next, user) => {

    console.warn ('Im lockin you out bitch', options, auth (context) )

    const
      { name , pass:password }
        = auth (context)


   console.warn (name, password)

    void

    (user = auth (context))
      && user.name == options.name
      && user.pass == options.password

    ? await next ()
    : (context.set ('WWW-Authenticate', 'Basic')
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/WWW-Authenticate
      // WWW-Authenticate: Basic realm="Access to the staging site", charset="UTF-8"
      && context.throw (401))
  }

