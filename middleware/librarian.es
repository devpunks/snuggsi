module.exports = options =>

  async (context, next, path = 'dist') => {

    await next ()
  }
