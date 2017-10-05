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

    Object.getOwnPropertyNames
      (Element.prototype).map
        (this.reflect, this)

    this
      .onconnect ()
      .render    ()
  }


  render () {

    this
      .tokens
      .bind (this)

    this
      .templates
      .map (template =>
        template.bind (this [template.name]))

    void
      [this, ... this.selectAll ('*')]
        .map (this.register, this)

    super.onidle && super.onidle ()
  }

})

