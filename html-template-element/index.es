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

  template.length
    && ( template = document.querySelector
       ( 'template[name=' + template + '' + ']' ) )


  template.bind = function (context) {

//  range.setEndBefore  (end)

    let
      html = []
        .concat (context)
        .reduce (tokenize, '')

//  range.deleteContents ()
//  console.warn ('last', template.parentNode.lastChild)
//  console.warn ('ranger delete', range)
//  template.insertAdjacentHTML ('afterend', html)
//  console.warn ('last', template.parentNode.lastChild)
//  range.setEndBefore  (template.parentNode.lastChild)
//  console.warn ('ranger insert', range)
//  range.setStartAfter (template)
  }


  function tokenize (html, context, index) {

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

