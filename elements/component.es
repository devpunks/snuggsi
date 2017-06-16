const Component = Element => // why buble

  // exotic object - https://github.com/whatwg/html/issues/1704

( class extends // interfaces
  ( EventTarget ( ParentNode ( GlobalEventHandlers ( Element ))))
{

  constructor () { super ()

    this.context = {}
    this.tokens  = new TokenList (this)

    Object
      .getOwnPropertyNames (Element.prototype)
      .map (this.introspect, this)

    this.initialize && this.initialize ()
  }

  connectedCallback () {

    HTMLLinkElement
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

    super.onidle && super.onidle ()
  }

  parse (template, insert) {

    template = template.cloneNode (true)

    insert = (replacement, name, slot) =>
      (name = replacement.getAttribute ('slot')) &&
      (slot = template.content.querySelector ('slot[name='+name+']'))
         // prefer to use replaceWith however support is sparse
         // https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/replaceWith
         // using `Node.parentNode` & `Node.replaceChid` as is defined in (ancient) W3C DOM Level 1,2,3
         .parentNode
         .replaceChild (replacement, slot)

    for (let node of this.selectAll ('[slot]'))
      insert (node)

    for (let attr of template.attributes)
      this.setAttribute (attr.name, attr.value)

    this.innerHTML = template.innerHTML
  }

})

