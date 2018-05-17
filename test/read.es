const
  encoding = 'utf-8'

, { readFileSync: read }
    = require ('fs')

, join = (source, buffer = []) =>
    then => source
      .on ('data', buffer.push)
      .on ('end' , _ => then (buffer.join ``))


module.exports = source =>

  typeof source === 'string'
    || Array.isArray (source)
      ? read ( source + '', encoding )
      : new Promise ( join ( source ) )
