const Template = template => {

  const
    range
      = document.createRange ()

  , end
      = template.nextSibling
        || template.parentNode.lastChild


  console.warn (range.setStartAfter (template))
  console.warn (range)
  window.range = range

  return template

  function bind (context) {

    const
      fragment =
        document.createElement ('section')

    , deposit = (html, context, index) => {
        let clone = HTML

        typeof context != 'object'
          && ( context  = { self: context })

        context ['#'] = index

        for (let i in context)
          clone = clone
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Using_special_characters
            // https://stackoverflow.com/questions/1144783/how-to-replace-all-occurrences-of-a-string-in-javascript#answer-17606289
            .split ('{'+i+'}')
            .join  (context [i])

        return html + clone
      }

    for (let node of // removes IE childNodes
          (this.dependents || [] ))
            // removeChild FAR faster
            // https://jsperf.com/innerhtml-vs-removechild/15
            node.parentNode.removeChild (node)


    fragment.innerHTML
      =[]
        .concat (context)
        .reduce (deposit, '')


    for (let dependent of this.dependents
          =[]
            .slice // non-live nodelist
            .call (fragment.childNodes))

        this
          .parentNode
          .insertBefore (dependent, anchor)
  }
}

