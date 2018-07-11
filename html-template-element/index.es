// https://html.spec.whatwg.org/multipage/scripting.html#the-template-element
// https://people.cs.pitt.edu/~kirk/cs1501/Pruhs/Spring2006/assignments/editdistance/Levenshtein%20Distance.htm

// https://github.com/WebReflection/hyperHTML/pull/100

// https://skillsmatter.com/skillscasts/10805-an-isomorphic-journey-to-a-lighter-and-blazing-fast-virtual-dom-alternative#video

// https://github.com/webcomponents/template
// https://gist.github.com/WebReflection/267689ec54d7267c853c47480bd35282
const Template = template => {

  template.length
    && ( template = document.querySelector
       ( 'template[name=' + template + '' + ']' ) )

  let
    HTML   = template.innerHTML
  , anchor = template.nextSibling

  template.innerHTML = ''

  template.bind =
    bind.bind (template)

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

