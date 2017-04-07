const GlobalEventHandlers = EventTarget =>
// https://www.w3.org/TR/html5/webappapis.html#globaleventhandlers
// GlobalEventHandlers - https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers
// on* events - https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Event_handlers
// Mix-ins    - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Mix-ins

(class extends EventTarget {
  // DOM Levels
  // (https://developer.mozilla.org/fr/docs/DOM_Levels)
  //
  // DOM Level 2 EventTarget
  // (AKA Str🎱  W3C #fockery) ➡️  https://annevankesteren.nl/2016/01/film-at-11
  // 😕  https://w3c.github.io/uievents/DOM3-Events.html#interface-EventTarget
  //❓❓ https://www.w3.org/TR/2000/REC-DOM-Level-2-Events-20001113/events.html
  // Within https://w3c.github.io/uievents/#conf-interactive-ua
  // EventTarget links to WHATWG - https://dom.spec.whatwg.org/#eventtarget
  //
  // WHATWG EventTarget
  // https://dom.spec.whatwg.org/#interface-eventtarget
  //
  // MDN EventTarget
  // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget

  constructor () { super ()
    this.mirror (EventTarget)
  }

  mirror (target) {
    const
      filter   = /^on/
    , onevents = name => filter.exec (name)
    , events   = prototype => introspect (prototype).filter (onevents)

    , subtract = list =>
        item => list.indexOf (item) < 0

    , introspect = (prototype = Element) =>
        Object.getOwnPropertyNames (prototype)

    , reflect = self => function (events) {
        events
          .filter (name => self [name] !== undefined)
          .map (delegate (self), this)
    }

    , delegate = self => function (name) {
        self [name] = self
          [(/{\s*(\w+)\s*}/.exec (self [name]) || Array (2)) [1]]
            || this [name]
      }

    , implicit = events (EventTarget)
    , explicit = Array.from (this.attributes)
        .map  (attr => attr.name)
        .filter (onevents)

    void [implicit.filter (subtract (explicit)), explicit]
      .map ( reflect (this), target )
  }

  listenable (nodes) {
    return Array.prototype.map
      .call (nodes, node => Object.assign
        (node, {listen: this.listen.bind(this)})) // MUTATES!
  }

  listen (event, listener = this [event])
    // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget#Example
    // Event target coparisons - https://developer.mozilla.org/en-US/docs/Web/API/Event/Comparison_of_Event_Targets
    { this.addEventListener (event, listener) }

  dispatch (event)
    // DOM Levels
    // (https://developer.mozilla.org/fr/docs/DOM_Levels)
    //
    // DOM Level 2 EventTarget.dispatchEvent
    //  https://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget-dispatchEvent
    //
    // WHATWG EventTarget.dispatchEvent
    //  https://dom.spec.whatwg.org/#dom-eventtarget-dispatchevent
    //
    // MDN EventTarget.dispatchEvent
    // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent

    { }

  // custom element reactions
  connectedCallback () {
    this.render () // this should go into render module?

    void ( super.constructor.onconnect
      || super.connectedCallback
      || function noop () {}
    ).call (this)
  }

  adoptedCallback ()
    { console.warn ('adopted this', this) }

  static get observedAttributes () { return ['id'] }
  attributeChangedCallback (property, previous, next)
    { console.warn ('['+property+'] ['+previous+'] to ['+next+']') }
})
