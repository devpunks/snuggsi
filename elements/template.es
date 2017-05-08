// INTERESTING! Converting `Template` to a class increases size by ~16 octets

//class Template {

//  constructor ( name = 'snuggsi' ) {
//    return Object.assign (this.factory (...name), { bind: this.bind })
//  }

//  bind (context) {
//    context = Array.isArray (context) ? context : [context]
//  }

//  factory (name) {
//    return (
//      document.querySelector ('template[name='+name+']').cloneNode (true)
//        || document.createElement ('template'))
//  }
//}

const Template = function (name) {

  return Object.assign
    (document.querySelector ('template[name='+name+']'), { bind } )

  function bind (context) {

    this.dependents =
      this.dependents || []

    context =
      Array.isArray (context) ? context : [context]

    let
      dependent = undefined

    const
      records = []

    while
      (dependent = this.dependents.pop ())
        dependent.remove ()

    for (let index = 0; index < context.length; index ++ ) {

      let
        clone  = this.cloneNode (true)
      , tokens = (new TokenList (clone.content))

      context [index]  =
        typeof context [index]  === 'object'
          ? context [index]
          : { self: context [index] }

      context [index] ['#'] = index

      tokens.bind  (context [index])
      records.push (clone)
    }

    records.map
      (function (record) { this.dependents.push (...record.content.childNodes) }, this)

    let fragment = document.createElement ('template')

    let a = records
      .map (record => record.innerHTML)
      .join ('')

    document.querySelector ('menu').innerHTML = a
//  this.after ( fragment.content )

    return this
  }
}

