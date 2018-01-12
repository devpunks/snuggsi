const
  auth = require ('basic-auth')


module.exports = options =>

  async (context, next) => {


    console.warn ('Im lockin you out bitch')

    user
      && user.name == options.name
      && user.pass == options.password
    ? await next ()
    : context.throw (401)
  }
