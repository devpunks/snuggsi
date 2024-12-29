// Based on Hypertext Transfer Protocol (HTTP/1.1): Authentication
// https://tools.ietf.org/html/rfc7235#section-4.1

// JWT
// - https://sohamkamani.com/nodejs/jwt-authentication
// - https://github.com/sohamkamani/jwt-nodejs-example

const
  auth = require ('basic-auth')


module.exports = ( options = { password = 'abc123'} ) =>

  async (context, next, { name, pass: password } = auth (context)) =>

    name != options.name
      || password != options.password

        // https://tools.ietf.org/html/rfc7235#section-4.1
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/WWW-Authenticate
        // WWW-Authenticate: Basic realm="Access to the staging site", charset="UTF-8"
        ? !!! context.set ('WWW-Authenticate', 'Basic') && (context.status = 401)

        : await next ()
