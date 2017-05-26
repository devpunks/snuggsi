// INTERESTING! Converting `Template` to a class increases size by ~16 octets

const HTMLTemplateElement = Template = function (name) {

  return Object.assign
    (document.querySelector ('template[name='+name+']'), { bind } )

  function bind (context) {

    this.dependents =
      this.dependents || []

    context =
      (Array.isArray (context) ? context : [context])
      .reverse ()

    let
      dependent = undefined

    const
      records = []

    while
      (dependent = this.dependents.pop ())
        dependent.remove ()

    let index = context.length

    while (index--) {

      let
        clone  = this.cloneNode (true)
      , tokens = (new TokenList (clone.content))

      context [index]  =
        typeof context [index]  === 'object'
          ? context [index]
          : { self: context [index] }

      context [index]
        ['#'] = index

      tokens.bind  (context [index])
      records.push (clone)
    }

    records.map
      (function (record) { this.dependents.push (...record.content.childNodes) }, this)

    let template = document.createElement ('template')

    let a = records
      .map (record => record.innerHTML)
      .join ('')

    template.innerHTML = a
    this.after ( template.content )

    return this
  }
}

