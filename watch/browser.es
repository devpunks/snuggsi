console.warn (process.env)
module.exports =
{
  files     : []
, startPath : '/'
, logPrefix : 'snuggsiツ'
, port      : process.env.BROWSER_PORT
, proxy     : `http://localhost:${process.env.PORT}`
, ui        : { port : process.env.BROWSER_UI_PORT }
}
