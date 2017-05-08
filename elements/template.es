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

    context.forEach ((item, index) => {

      let
        clone  = this.cloneNode (true)
      , tokens = (new TokenList (clone.content))

      item =
        typeof item === 'object'
          ? item
          : { self: item }

      item ['#'] = index

      tokens.bind  (item)
      records.push (clone)
    })

    records.map
      (function (record) { this.dependents.push (...record.content.childNodes) }, this)

    let fragment = document.createElement ('template')

    let a = records
      .map (record => record.innerHTML)
      .join ('')

    fragment.innerHTML = a
    this.after ( fragment.content )

    return this
  }
}

