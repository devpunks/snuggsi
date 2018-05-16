const
  encoding = 'utf-8'

, { readFileSync: read }
    = require ('fs')

, join = (buffer = []) =>
    function (then) {
      this
        .on ('data', buffer.push)
        .on ('end' , _ => then (buffer.join ``))
    }


module.exports = source =>

  (buffer = [])
    && typeof source === 'string'
    || Array.isArray (source)

      ? read
          ( source + '', encoding )

      : new Promise
         ( join (buffer).bind (source) )
