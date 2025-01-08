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
 
    this.addEventListener
      ('idle', super.onidle)

    this.onconnect && this.onconnect ()
    this.dispatch ('connect')

    this.render ()
  } // connectedCallback

  disconnectedCallback () {
    this.ondisconnect && this.ondisconnect ()
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

