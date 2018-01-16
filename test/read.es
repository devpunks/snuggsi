const
  encoding = 'utf-8'
, { readFileSync: read }
    = require ('fs')

module.exports = (source, buffer) => {

  return (buffer = [])
    && typeof source === 'string'
    || Array.isArray (source)

      source
        .on ('data', data => buffer.push (data))
        .on ('end' , _ => resolve (buffer.join ``))
  })
}
