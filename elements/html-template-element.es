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

    this.dependents =
      this.dependents || []

    while
      (dependent = this.dependents.pop ())
        dependent.remove ()

    contexts.map ((c, index) => {
      console.log (c, index)

      clone  = this.cloneNode (true)
      tokens = (new TokenList (clone.content))
    })

//  while (index--) {

//    let
//      clone  = this.cloneNode (true)
//    , tokens = (new TokenList (clone.content))

//    contexts [index] =
//      typeof contexts [index]  === 'object'
//        ? contexts [index]
//        : { self: contexts [index] }

//    contexts [index]
//      ['#'] = index

//    tokens.bind (contexts [index])
//    fragments.push (clone)
//  }

    fragments.map
      (function (fragment) { this.dependents.push (...fragment.content.childNodes) }, this)

    let template = document.createElement ('template')

    let a = fragments
      .map (record => record.innerHTML)
      .join ('')

    template.innerHTML = a

    console.log (template.content.childNodes)

    this.after ( template.content )

    return this
  }

}

