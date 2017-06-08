const GlobalEventHandlers = Element =>

  // Living Standard HTML5 GlobalEventHandlers
  // https://html.spec.whatwg.org/multipage/webappapis.html#globaleventhandlers
  //
  // MDN GlobalEventHandlers
  // https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers
  //
  // MDN on* Events
  // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Event_handlers
  //
  // DOM Level 0
  // This event handling model was introduced by Netscape Navigator,
  // and remains the most cross-browser model as of 2005
  // https://en.wikipedia.org/wiki/DOM_events#DOM_Level_0#DOM_Level_0
  //
  // Inline Model
  // https://en.wikipedia.org/wiki/DOM_events#DOM_Level_0#Inline_model
  //
  // Traditional Model
  // https://en.wikipedia.org/wiki/DOM_events#Traditional_model
  //
  // Traditional Registration
  // http://www.quirksmode.org/js/events_tradmod.html

(class extends Element {

  onimport (event, document) {

    (document = event.target.import)
      && this.clone (document.querySelector ('template'))


    // dispatch `import`
    // and captured from `EventTarget`
    Element.onconnect &&
      Element.onconnect.call (this)

    // dispatch `render`
    // and captured from `EventTarget`
    this.render ()
  }

  register () {

    const
      onevents =
        attr => /^on/.test (attr)

    , mirror = handler =>
        onevents (handler) &&
        (this [handler] === null) && // ensure W3C on event
        (this [handler] = render (Element [handler]))

    , render = handle =>
        (event, render = true) =>
          (event.prevent = _ => render = null)
            && handle.call (this, event) !== false // for `return false`
            && render && this.render () // check render availability

    , children =
        Array.from (this.querySelectorAll ('*'))

    , reflect = node =>
        Array
          .from (node.attributes)
          .map (attr => attr.name)
          .filter (onevents)
          .map (reflection (node))

    , reflection = node => // closure
        (event, handler) =>
          (handler = /{\s*(\w+)\s*}/.exec (node [event]))
            && ( handler = (handler || []) [1] )
            && ( handler = Element [handler] ) // change to this [handler] for `static` removal
            && ( node [event] = handler.bind (this) )

    Object // mirror instance events to element
      .getOwnPropertyNames (Element)
      .map (mirror)

    void [this] // reflect events from Element
      .concat (children)
      .map (reflect)
  }

})

