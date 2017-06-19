Element `nav-view`

(class extends HTMLElement {

  initialize () {
    document.addEventListener
      ('DOMContentLoaded', this.onloaded)
  }

  onloaded () {
    this.context.views = Array.from
      (document.body.querySelectorAll `[view]`)

    this.context.anchors =
        this.context.views
          // what's the difference between `hidden`ing and `display: none`
          .map (this.hide)
          .map (view => ({ href: `#${view.id}`, text: view.title }))

    this.context.views
      && (this.context.views [0].hidden = false)

    this.render ()
  }

  onview (event, anchor = event.target) {
    event.prevent ()

    history.pushState ({}, anchor.title, anchor.href)

    this.context.views.map (this.hide)

    this.identify (event.target)
      .hidden = false
  }

  hide (view)
    { return (view.hidden = true) && view }

  identify (anchor) {
    return document.getElementById
      (anchor.href.match (/#(.+)$/)[1])
  }

  get anchors ()
    { return this.context.anchors }

})

