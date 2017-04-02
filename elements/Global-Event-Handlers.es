// on* events https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Event_handlers
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Mix-ins
const GlobalEventHandlers = EventTarget => class extends EventTarget {
  // DOM Levels
  // (https://developer.mozilla.org/fr/docs/DOM_Levels)
  //
  // DOM Level 2 EventTarget
  // 😕  https://w3c.github.io/uievents/DOM3-Events.html#interface-EventTarget
  //❓❓ https://www.w3.org/TR/2000/REC-DOM-Level-2-Events-20001113/events.html
  //  Within https://w3c.github.io/uievents/#conf-interactive-ua
  //  EventTarget links to WHATWG - https://dom.spec.whatwg.org/#eventtarget
  //
  // WHATWG EventTarget
  // https://dom.spec.whatwg.org/#interface-eventtarget
  //
  // MDN EventTarget
  // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget

  // custom element reactions
  connectedCallback () {
    (super.initialize || function noop () {}).call (this)

    this.render ()

    super.constructor.onconnect
      ?  super.constructor.onconnect
      :  super.connectedCallback
//    || function noop () {}
    .call (this)
  }

  listenable (nodes) {
    return Array.prototype.map
      .call (nodes, node => Object.assign
        (node, {listen: this.listen.bind(this)})) // MUTATES!
  }

  // Event target coparisons - https://developer.mozilla.org/en-US/docs/Web/API/Event/Comparison_of_Event_Targets
  listen (event, listener = this [event])
    { this.addEventListener (event, listener) }

  adoptedCallback () { console.warn ('adopted this', this) }

  stateChangedCallback (previous, next)
      { console.warn ('previous', previous, 'next', next) }

  static get observedAttributes () { return ['id'] }
  attributeChangedCallback (property, previous, next)
      { console.warn ('['+property+'] ['+previous+'] to ['+next+']') }
}
