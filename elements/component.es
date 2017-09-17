const Custom = Element => // why buble

( class extends // interfaces
  ( EventTarget
  ( ParentNode
  ( GlobalEventHandlers
  ( Element ))))
{
  connectedCallback () {

    this.context = {}

    super.initialize
      && super.initialize ()

    super.connectedCallback

    Object.getOwnPropertyNames
      (Element.prototype).map
        (this.reflect, this)

    this
      .onconnect ()
      .render ()
  }


  render () {

    this
      .tokens
      .bind (this)

    this
      .templates
      .map (template =>
        template.bind (this [template.name]))

    void [this]

      .concat ( ... this.selectAll ('*') )

      .map (this.register, this)

    super.onidle && super.onidle ()
  }

})

