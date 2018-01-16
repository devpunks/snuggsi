const
  { readFileSync: read }
    = require ('fs')

module.exports = function (source) {
  source
    .on ('data', console.log)
    .on ('end', _ => console.warn ('ended'))
}
