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

    this.onconnect ()
    this.render    ()
  }


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

    super.onidle && super.onidle ()
  }

})

