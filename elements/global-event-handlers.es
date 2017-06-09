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
  // All Event Handling Models
  // https://en.wikipedia.org/wiki/DOM_events#Event_handling_models
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

  onconnect (event, document) {

    (document = event.target.import)
      && this.clone (document.querySelector ('template'))

    super.onconnect
      && super.onconnect.call (this)

    this.render ()
  }

  // Reflection - https://en.wikipedia.org/wiki/Reflection_(computer_programming)
  // Type Introspection - https://en.wikipedia.org/wiki/Type_introspection
  //
  // In computing, type introspection is the ability of a program
  // to examine the type or properties of an object at runtime.
  // Some programming languages possess this capability.
  //
  // Introspection should not be confused with reflection,
  // which goes a step further and is the ability for a program to manipulate the values,
  // meta-data, properties and/or functions of an object at runtime.

  reflect () {

    const
      onevents = attr =>
        /^on/.test (attr)

    , introspect = handler =>
        onevents (handler)
        && (this [handler] === null) // ensure W3C on event
        && (this [handler] = render (Element [handler]))

    , render = handle =>
        (event, render = true) =>
          (event.prevent = _ => (render = null) && event.preventDefault ())
            && handle.call (this, event) !== false // for `return false`
            && render && this.render () // check render availability

    , examine = node =>
        Array
          .from (node.attributes)
          .map (attr => attr.name)
          .filter (onevents)

    , register = node => // closure
        (event, handler) =>
          (handler = /{\s*(\w+)\s*}/.exec (node [event]))
            && ( handler = (handler || []) [1] )
            && ( handler = Element [handler] ) // change to this [handler] for `static` removal
            && ( node [event] = handler.bind (this) )

    Object
      .getOwnPropertyNames (Element)
      .map (introspect)

    Array
      .from (this.querySelectorAll ('*'))
      .concat ([this])
      .map (examine)
      .map (register (node))
  }

})

