function GlobalEventHandlers ( Element ) {

// Living Standard HTML5 GlobalEventHandlers
// https://html.spec.whatwg.org/multipage/webappapis.html#globaleventhandlers
//
// MDN GlobalEventHandlers
// https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers
//
// MDN on* Events
// https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Event_handlers
return class extends Element {

  onconnect ( event ) {

    this.templates =
      this
        .selectAll ('template[name]')
        .map (Template)

    this.tokens =
      new TokenList (this)

    super.onconnect
      && super.onconnect (event)
  } // onconnect

  ondisconnect ( event ) {

    super.ondisconnect
      && super.ondisconnect (event)
  } // ondisconnect

} // class

} // GlobalEventHandlers

