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
  // https://en.wikipedia.org/wiki/DOM_events#Inline_model
  //
  // Traditional Model
  // https://en.wikipedia.org/wiki/DOM_events#Traditional_model
  //
  // Traditional Registration
  // http://www.quirksmode.org/js/events_tradmod.html


  // HandleEvent Registration - https://viperhtml.js.org/hyperhtml/documentation/#essentials-6

(class extends Element {

  onconnect (event) {

    this.templates =
      this
        .selectAll ('template[name]')
        .map (Template)

    this.tokens =
      new TokenList (this)

    super.onconnect
      && super.onconnect (event)
  }

})
