const
  encoding = 'utf-8'
, { readFileSync: read }
    = require ('fs')

module.exports = (source, buffer) =>

  (buffer = [])
    && typeof source === 'string'
    || Array.isArray (source)

      ? read ( (source + '') , encoding )

      : new Promise (resolve =>
          source
            .on ('data', buffer.push)
            .on ('end' , _ => resolve (buffer.join ``))
        )
