module.exports =
{
  files     : []
, startPath : '/'
, ui        : false
, logPrefix : 'snuggsiツ'
, port      : process.env.BROWSER_PORT
, proxy     : `http://localhost:${process.env.PORT}`
, ui        : { port : process.env.BROWSER_UI_PORT }
}
