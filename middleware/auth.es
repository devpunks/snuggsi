const
  auth = require ('basic-auth')


module.exports = options =>

  async (context, next, { name, pass:password } = auth (context)) => {

    console.warn ('Im lockin you out bitch', options, auth (context) )

    return name == options.name
      && (password == options.password)
      && await next ()

      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/WWW-Authenticate
      // WWW-Authenticate: Basic realm="Access to the staging site", charset="UTF-8"
      context.set ('WWW-Authenticate', 'Basic')
      context.throw (401)
  }
