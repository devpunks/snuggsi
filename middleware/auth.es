const
  auth = require ('basic-auth')


module.exports = options =>

  async (context, next, user) => {

    console.warn ('Im lockin you out bitch', auth (context) )

    void

    (user = auth (context))
      && user.name == options.name
      && user.pass == options.password
    ? await next ()
    : context.throw (401)
  }
