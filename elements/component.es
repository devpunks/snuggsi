const Component = Element => // why buble

  // exotic object - https://github.com/whatwg/html/issues/1704

( class extends // interfaces
  ( EventTarget ( ParentNode ( GlobalEventHandlers ( Element ))))
{

  constructor () { super ()

    this.context = {}
    this.tokens  = new TokenList (this)

    Object
      .getOwnPropertyNames
         (Element.prototype)

      .map
         (this.introspect, this)

    this.initialize
      && this.initialize ()
  }

  connectedCallback () {

    new HTMLLinkElement
      (this.tagName.toLowerCase ())
        .addEventListener ('load', this.onconnect.bind (this))
  }

  render () {

    this.tokens.bind (this)

    Array
      .from // templates with `name` attribute
        (this.selectAll ('template[name]'))

      .map
        (template => template.getAttribute ('name'))

      .map
        (name => (new Template (name)).bind (this [name]))

    Array
      .from (this.selectAll ('*'))

      .concat ([this])

      .map (this.reflect, this)

    super.onidle
      && super.onidle ()
  }

  // This doesn't go here. Perhaps SlotList / Template / TokenList (in that order)
  parse (template) {

    const
      content = template.content
        .cloneNode (true)

    , replace = replacement =>
        Array
          .from (content.querySelectorAll ('slot'))
//        .filter (match (replacement))
//        .map (exchange (replacement))

    , match = replacement =>
        slot =>
          console.log (replacement, slot,
          replacement.getAttribute ('slot')
            === slot.getAttribute  ('name'))

    , exchange = replacement =>
        slot => slot
          // prefer to use replaceWith however support is sparse
          // https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/replaceWith
          // using `Node.parentNode` & `Node.replaceChid` as is defined in (ancient) W3C DOM Level 1,2,3
          .parentNode
          .replaceChild (replacement, slot)

    Array // map attributes from template
      .from (template.attributes)
      .map  (attribute => this.setAttribute (attribute.name, attribute.value))


    Array // map slots from template
      .from (this.querySelectorAll ('[slot]'))
      .map  (replace)

    this.innerHTML = template.innerHTML
  }

})

