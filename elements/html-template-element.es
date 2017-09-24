// https://people.cs.pitt.edu/~kirk/cs1501/Pruhs/Spring2006/assignments/editdistance/Levenshtein%20Distance.htm

// https://github.com/WebReflection/hyperHTML/pull/100

// https://skillsmatter.com/skillscasts/10805-an-isomorphic-journey-to-a-lighter-and-blazing-fast-virtual-dom-alternative#video

// https://github.com/webcomponents/template
const Template = HTMLTemplateElement = function (template) {

  template =
    typeof template == 'string'
      ? document.querySelector ('template[name='+template+']')
      : template

  template =
    this === HTMLTemplateElement
      ? template.cloneNode (true)
      : template

  template.name =
    template.getAttribute ('name')

  template.comment =
    document.createComment (template.name)

  template
    .parentNode
    .replaceChild
      (template.comment, template)

  return Object
    .defineProperty
      (template, 'bind', { value: bind })

  function bind (context) {

    let
      html     = ''
    , template = this.innerHTML
    , contexts = [].concat ( ... [context] )
        // https://dom.spec.whatwg.org/#converting-nodes-into-a-node

    const
      keys =
        'object' === typeof contexts [0]
          ? Object.keys (contexts [0])    // memoize keys
          :  []
          .concat (['#', 'self']) // add helper keys

    , tokens =
        keys.map (key => '{'+key+'}') // memoize tokens

    , fragment = // create template polyfill here
        document.createElement ('template')

    , deposit = (context, index) => {
        let clone = template

        context = (typeof context  === 'object')
          ? context : { self: context }

        context ['#'] = index

        for (let i=0; i<tokens.length; i++)
          clone = clone
            .split (tokens [i])
            .join  (context [keys [i]])

        return clone
      }

    void ( this.dependents || [] ).map
      (dependent => dependent.parentNode.removeChild (dependent))

    for (let i=0, final = ''; i<contexts.length; i++)
      html += deposit (contexts [i], i)

    fragment.innerHTML = html

    var children =
      (fragment.content || fragment).childNodes

    this.dependents =
      Array.apply (null, children) // non-live

    this.comment.after
      && this.comment.after ( ... this.dependents )

    !!!  this.comment.after
      && this.dependents.reverse ()
         .map (dependent =>
           this.comment.parentNode.insertBefore
             (dependent, this.comment.nextSibling))
  }
}

