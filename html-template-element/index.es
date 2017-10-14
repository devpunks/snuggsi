// https://people.cs.pitt.edu/~kirk/cs1501/Pruhs/Spring2006/assignments/editdistance/Levenshtein%20Distance.htm

// https://github.com/WebReflection/hyperHTML/pull/100

// https://skillsmatter.com/skillscasts/10805-an-isomorphic-journey-to-a-lighter-and-blazing-fast-virtual-dom-alternative#video

// https://github.com/webcomponents/template
const Template = function (template) {

  typeof template == 'string'
    && (template = document.querySelector
        ('template[name='+template+']'))

  template.hidden = true

  template.HTML =
    template.innerHTML

  template.bind =
    bind.bind (template)

  return template

  function bind (context, anchor) {

    const
      fragment =
        document.createElement ('section')

    , deposit = (html, context, index) => {
        let clone = this.HTML

        typeof context != 'object'
          && ( context  = { self: context })

        context ['#'] = index

        for (let i in context)
          clone = clone
            .split ('{'+i+'}')
            .join  (context [i])

        return html + clone
      }

    for (let node of // removes IE childNodes
          (this.dependents || [] ))
            node.parentNode.removeChild (node)


    fragment.innerHTML =
      []
        .concat (context)
        .reduce (deposit, '')


    anchor =
      this.nextSibling

    for (let dependent of
          this.dependents = // non-live
            [].slice.call (fragment.childNodes))

        this
          .parentNode
          .insertBefore (dependent, anchor)
  }
}

