const
  { readFileSync: read }
    = require ('fs')

, join = (source, buffer = []) =>
    then => source
      .on ('data', buffer.push)
      .on ('end' , _ => then (buffer.join ``))


module.exports = source =>

  typeof source === 'string'
    || Array.isArray (source)
      ? read ( source + '', 'utf-8' )
      : new Promise ( join ( source ) )
