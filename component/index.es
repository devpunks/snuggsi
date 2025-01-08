function Custom ( Element ) { // why buble
//class extends // interfaces
Element = EventTarget ( ParentNode
//  ( GlobalEventHandlers
  ( Element )) // ))


//{
  Element.prototype.render = function () {

    for (let template of this.templates)
      template.bind
        (this [template.getAttribute ('name')])

    this
      .tokens
      .bind (this)

    this.register (this)

    this
      // possibly restrict to elements with on event
      .selectAll ('*')
      .map (this.register, this)

    this.dispatch ('idle')
  } // render

  Element.prototype.connectedCallback ||
  (Element.prototype.connectedCallback = function () {
    this.context = {}

    this.initialize
      && this.initialize ()

    Object
      .getOwnPropertyNames (Element.prototype)
      .map (this.reflect, this)

    this.addEventListener
      ('connect', this.onconnect)

    this.dispatch ('connect')

    this.templates =
      this
        .selectAll ('template[name]')
        .map (Template)

    this.tokens =
      new TokenList (this)

    this.addEventListener
      ('idle', this.onidle)

    this.render ()
  }) // connectedCallback

  Element.prototype.disconnectedCallback ||
  (Element.prototype.disconnectedCallback = function () {
    this.ondisconnect
      && this.ondisconnect ()

    this.dispatch ('disconnect')
  }) // disconnectedCallback

//} // class

  return Element
} // Custom

