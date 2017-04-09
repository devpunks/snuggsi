const GlobalEventHandlers = Node =>

  // DOM Levels
  // (https://developer.mozilla.org/fr/docs/DOM_Levels)
  //
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

(class extends Node {

  constructor () { super ()
    this.register (this.querySelectorAll ('*'))
  }

  register (nodes) {
    console.log ('what', nodes)

    const exclude =
      ['template', 'link', 'style', 'script']

    , blacklist = element =>
        ! exclude.includes
            (element.tagName.toLowerCase ())

    var a = [this, ...(Array.from (nodes))]
      .filter (blacklist)
      .map (this.mirror, this)

    return this
  }

  mirror (node) {
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

    , implicit = events (Node)
    , explicit = Array.from (node.attributes)
        .map  (attr => attr.name)
        .filter (onevents)

    console.log(Node.onclick, explicit)

    void [implicit.filter (subtract (explicit)), explicit]
      .map ( reflect (this), Node )
  }

  // custom element reactions
  connectedCallback () {
    void ( super.constructor.onconnect
      || super.connectedCallback
      || function noop () {}
    ).call (this)

    this.render ()
  }

  static get observedAttributes () { return ['id'] }
  attributeChangedCallback (property, previous, next)
    { console.warn ('['+property+'] ['+previous+'] to ['+next+']') }
})
