const
  auth = require ('basic-auth')


module.exports = options =>

  async (context, next, { name, pass:password } = auth (context)) =>

    name != options.name
      || password != options.password

        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/WWW-Authenticate
        // WWW-Authenticate: Basic realm="Access to the staging site", charset="UTF-8"
        ? !!! context.set ('WWW-Authenticate', 'Basic') && context.throw (401)

      : await next ()
