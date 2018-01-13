module.exports = options =>

  async (context, next, path = 'dist') => {

    // code for distribution here
    await next ()
  }
