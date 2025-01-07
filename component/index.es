const Custom = Element => // why buble

( class extends // interfaces
  ( ParentNode
  ( EventTarget
  ( GlobalEventHandlers
  ( Element ))))
{
  connectedCallback () {
    this.context = {}

    super.initialize
      && super.initialize ()

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
      ('idle', super.onidle)

    this.render ()
  } // connectedCallback

  disconnectedCallback () {
    super.ondisconnect
      && super.ondisconnect (event)

    this.dispatch ('disconnect')
  } // disconnectedCallback

  render () {

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

}) // class

