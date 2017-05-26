// INTERESTING! Converting `Template` to a class increases size by ~16 octets

const HTMLTemplateElement = Template = function (name) {

  return Object.assign
    (document.querySelector ('template[name='+name+']'), { bind } )

  function bind (context) {
    contexts = [].concat ( ... [context] )

    let
      clone
    , tokens
    , fragments = []
    , dependent = undefined
    , template = document.createElement ('template')

    this.dependents =
      this.dependents || []

    while
      (dependent = this.dependents.pop ())
        dependent.remove ()


    template.innerHTML =
    contexts.map ((c, index) => {
      console.log (c, index)

      contexts [index] =
        typeof contexts [index]  === 'object'
          ? contexts [index]
          : { self: contexts [index] }

      contexts [index]
        ['#'] = index

      clone  = this.cloneNode (true)
      tokens = (new TokenList (clone.content))

      tokens.bind (contexts [index])
      return clone
    })

    .map
      (function (fragment) { this.dependents.push (...fragment.content.childNodes); return fragment }, this)

    .map (record => record.innerHTML)
    .join ('')

    this.after ( template.content )

    return this
  }

}

