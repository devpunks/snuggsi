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

  onconnect (event, target) {

    console.warn ('On Connecting!!!');

    event
      && event.target
      && (target = event.target)
      && this.mirror
        (target.import.querySelector ('template'))

    super.onconnect
      && super.onconnect ()

    this.tokens = new TokenList (this)
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

  reflect (handler, event) {

    ( event = ( handler.match (/^on(.+)$/) || [] ) [1] )

      && // ensure W3C on event
        HTMLElement.prototype
          .hasOwnProperty (handler)

      &&
        this.on (event, this [handler])
  }

  register (node) {
    const
      register = (event, handler) =>
        // https://www.quirksmode.org/js/events_tradmod.html
        // because under traditional registration the handler value is wrapped in scope `{ onfoo }`
        (handler = /{\s*(\w+)\s*}/.exec (node [event]))

        && ( handler = this [ (handler || []) [1] ] )
        && ( node [event] = this.renderable (handler) )

    Array
      .from (node.attributes)
      .map (attr => attr.name)
      .filter (name => /^on/.test (name))
      .map (register)
  }
})

