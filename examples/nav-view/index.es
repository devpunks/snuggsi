Element `nav-view`

(class extends HTMLElement {

  initialize () {

    /comp|inter|loaded/.test (document.readyState)
      ? this.onloaded ()
      : document.addEventListener
          ('DOMContentLoaded', this.onload)
  }

  onload () {

    (this.context.views = Array.from
      (document.body.querySelectorAll `[view]`))
      .map (this.hide)

        && (this.context.views [0].hidden = false)

      // what's the difference between `hidden`ing and `display: none`

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

  get anchors () {
    return (this.context.views || [])
      .map (view => ({ href: `#${view.id}`, text: view.title }))
  }

})

