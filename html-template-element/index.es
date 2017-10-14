// https://people.cs.pitt.edu/~kirk/cs1501/Pruhs/Spring2006/assignments/editdistance/Levenshtein%20Distance.htm

// https://github.com/WebReflection/hyperHTML/pull/100

// https://skillsmatter.com/skillscasts/10805-an-isomorphic-journey-to-a-lighter-and-blazing-fast-virtual-dom-alternative#video

// https://github.com/webcomponents/template
const Template = function (template) {

  template =
    typeof template == 'string'

      ? document.querySelector ('template[name='+template+']')

      : this === HTMLTemplateElement
          ? template.cloneNode (true)
          : template

  template
    .parentNode
    .replaceChild
      ( template.comment= document.createComment
        ( template.name  = template.getAttribute ('name') )
      , template)


  return Object
    .defineProperty
      (template, 'bind', { value: bind })

  function bind (context, anchor) {

    const
      fragment =
        document.createElement ('template')

    , deposit = (html, context, index) => {
        let clone = this.innerHTML

        typeof context != 'object'
          && ( context  = { self: context })

        context ['#'] = index

        for (let i in context)
          clone = clone
            .split ('{'+i+'}')
            .join  (context [i])

        return html + clone
      }

    ( this.dependents || [] ).map
      (dependent => dependent.parentNode.removeChild (dependent))


    fragment.innerHTML =
      []
        .concat (context)
        .reduce (deposit, '')


    this.dependents =
      [] // non-live
        .slice
        .call
        ( ( fragment.content || fragment ).childNodes )


    anchor =
      this.comment.nextSibling

    for (let dependent of this.dependents)
      this.comment.parentNode.insertBefore (dependent, anchor)
  }
}

