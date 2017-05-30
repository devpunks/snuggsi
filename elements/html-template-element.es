// INTERESTING! Converting `Template` to a class increases size by ~16 octets

const HTMLTemplateElement = Template = function (name) {

  return Object.assign
    (document.querySelector ('template[name='+name+']'), { bind } )

  function bind (context) {
    contexts = [].concat ( ... [context] )

    let
      clone
    , template = this.cloneNode (false)

    void (this.dependents || [])
      .map (dependent => dependent.remove ())

    this.dependents = []

    template.innerHTML =
    contexts.map ((context, index) => {
      (context = (typeof context  === 'object') ? context : { self: context })
        ['#'] = index

      clone  = this.cloneNode (true)

      void (new TokenList (clone.content))
        .bind (context)

      return clone.innerHTML
    })
    .join ('')

    this.dependents.push (...template.content.childNodes)
    this.after ( template.content )

    return this
  }
}

