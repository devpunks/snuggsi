
var this$1 = this;
var Template = function ( name ) {
  if ( name === void 0 ) name = 'snuggsi';

  return Object.assign (factory.apply (void 0, name), { bind: bind })

  function bind (context) {
    var this$1 = this;

    context = (Array.isArray (context) ? context : [context])

    var
      tokens   = []
    , rendered = context
        .map (function (context) { return this$1.content.cloneNode (true); })
        .map (collect, tokens)

    this.innerHTML = ''
    for (var i = 0, list = rendered; i < list.length; i += 1) {
      var frame = list[i];

      this$1.content.appendChild (frame)
    }

    return context.map(transfer, tokens) && this
  }

  function factory (name) {
    return (
       document.querySelector ('template[name='+name+']').cloneNode (true)
    || document.createElement ('template')
  )}

  function collect (fragment) {
    var objectify = function (tokens) { return tokens.reduce ( function (object, token) { return (object [token.textContent.match (/{(.+)}/) [1]]  = token) && object; }
      , {}); }

    return this.push (objectify (tokenize (fragment))) && fragment
  }

  function transfer (context, index) {
    var this$1 = this;

    for (var property in context) { this$1 [index]
      [property] && (this$1 [index] [property].textContent = context [property]) }
  }
}
var EventTarget = function (Node) { return ((function (Node) {
    function anonymous () {
      Node.apply(this, arguments);
    }

    if ( Node ) anonymous.__proto__ = Node;
    anonymous.prototype = Object.create( Node && Node.prototype );
    anonymous.prototype.constructor = anonymous;

    anonymous.prototype.listen = function (event, listener)

    // MDN EventTarget.addEventListener
    // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
    //
    // WHATWG Living Standard EventTarget.addEventListener
    // https://dom.spec.whatwg.org/#dom-eventtarget-removeeventlistener
    //
    // DOM Level 2 EventTarget.addEventListener
    // https://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget-addEventListener

    {
    if ( listener === void 0 ) listener = 'on' + this$1 [event];
 this.addEventListener (event, listener) };

    return anonymous;
  }(Node))); }
var TokenList = function (nodes) {
  var this$1 = this;

  var
    symbolize = function (symbol) { return symbol.match (/(\w+)/g) [0]; }

  , insert = function (token) { return function (symbol) { return this$1 [symbol] = token; }; }

  , tokenize = function (token) { return token.textContent.match (/{(\w+)}/g)
        .map (symbolize)
        .map (insert (token)); }

  , textify = function (node) { return (node.text = node.data) && node; }

  nodes
    .map (textify)
    .map (tokenize)
};


TokenList.prototype.bind = function (context, node) {
    var this$1 = this;


  for (var property in this$1)
    { node = this$1 [property]
    , node.data = node.text }

  for (var property$1 in this$1)
    { node = this$1 [property$1]
    , node.data = node.data
      .replace ('{'+property$1+'}', context [property$1]) }

  return this
};

var ParentNode = function (Node) { return ((function (Node) {
    function anonymous () {
      Node.apply(this, arguments);
    }

    if ( Node ) anonymous.__proto__ = Node;
    anonymous.prototype = Object.create( Node && Node.prototype );
    anonymous.prototype.constructor = anonymous;

    var prototypeAccessors = { texts: {},tokens: {} };

    anonymous.prototype.selectAll = function (selector) {
    return this.listenable
      (this.querySelectorAll (selector))
  };

  // watch out for clobbering `HTMLInputElement.select ()`
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/select
  anonymous.prototype.select = function (selector) { return this.selectAll (selector) [0] };

  prototypeAccessors.texts.get = function () {
    var
      visit = function (node, filter) {
          if ( filter === void 0 ) filter = /({\w+})/g;

          return filter.exec (node.data) // stored regex is faster https://jsperf.com/regexp-indexof-perf
          && NodeFilter.FILTER_ACCEPT;
    }

    , walker = document.createNodeIterator
        (this, NodeFilter.SHOW_TEXT, visit)
        // by default breaks on template YAY! 🎉

    var
      node
    , nodes = []

    while (node = walker.nextNode ())
      { nodes.push (node) }

    return nodes
  };

  prototypeAccessors.tokens.get = function () {
    return this._tokens
      || (this._tokens = new TokenList (this.texts))
  };

    Object.defineProperties( anonymous.prototype, prototypeAccessors );

    return anonymous;
  }(Node))); }

//function comb
//  // ElementTraversal interface
//  // https://www.w3.org/TR/ElementTraversal/#interface-elementTraversal
//
//(parent) {
//  if (parent.hasChildNodes())
//    for (let node = parent.firstChild; node; node = node.nextSibling)
//      comb (node)
//}
var GlobalEventHandlers = function (prototype) { return ((function (prototype) {
    function anonymous () { prototype.call (this)

    var
      events =
        function (event) { return /^on/.exec (event); }

    this
      .register (events)
      .mirror (events)
  }

    if ( prototype ) anonymous.__proto__ = prototype;
    anonymous.prototype = Object.create( prototype && prototype.prototype );
    anonymous.prototype.constructor = anonymous;

  anonymous.prototype.mirror = function (events) {
    var this$1 = this;


    Object
      .getOwnPropertyNames (prototype)
      .filter (events)
      .forEach (function (handler) { return !!! this$1 [handler] && (this$1 [handler] = prototype [handler]); })

    return this
  };

  anonymous.prototype.register = function (events) {
    var this$1 = this;


    var
      nodes = // CSS :not negation https://developer.mozilla.org/en-US/docs/Web/CSS/:not
        // How can we select elements with on* attribute? (i.e. <... onclick=foo onblur=bar>)
        // If we can do this we can only retrieve the elements that have a traditional inline event.
        // This is theoretically more performant as most elements won't need traditional event registration.
        ':not(script):not(template):not(style):not(link)' // remove metadata elements

    , children =
        Array
          .from (this.querySelectorAll (nodes))

    , registered = function (node) { return Array.from (node.attributes)
          .map (function (attr) { return attr.name; })
          .filter (events)
          .length > 0; }

    , handle =
        function (event, handler)  {
            if ( handler === void 0 ) handler = (/{\s*(\w+)\s*}/.exec (event) || []) [1];

            return handler
            && prototype [ handler ]
            || event
            || null;
    }

    , reflect =
        function (self) { return function (node) { return Array
              .from (node.attributes)
              .map (function (attr) { return attr.name; })
              .filter (events)
              .filter (function (name) { return this$1 [name] !== undefined; })
              .map (reflection (node)); }; }

    , reflection =
        function (node) { return function (event) { node [event] = handle (node [event]) }; }

    [this]
      .concat (children)
      .filter (registered)
      .map (reflect (this))

    return this
  };

    return anonymous;
  }(prototype))); }
var ElementPrototype = window.Element.prototype // see bottom of this file

var Element = function (
  // Custom elements polyfill
  // https://github.com/webcomponents/custom-elements/blob/master/src/custom-elements.js
  // https://github.com/w3c/webcomponents/issues/587#issuecomment-271031208
  // https://github.com/w3c/webcomponents/issues/587#issuecomment-254017839
  // Function.name - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name#Examples
  //https://gist.github.com/allenwb/53927e46b31564168a1d

  tag

, CustomElementRegistry
) {
  if ( tag === void 0 ) tag = Array.isArray
    (arguments [0]) ? arguments [0][0] : arguments [0];
  if ( CustomElementRegistry === void 0 ) CustomElementRegistry = window.customElements;


  return function // https://en.wikipedia.org/wiki/Higher-order_function
    (HTMLElement, self)
  {
    if ( self === void 0 ) self = this === window && this || {};
 // Should this be a class❓❓❓❓

    try
      { return new CustomElementRegistry.get (tag) }

    catch (_)
      { /* console.warn('Defining Element `'+tag+'` (class {})') */ }

    var HTMLCustomElement = (function (superclass) {
      function HTMLCustomElement () { superclass.call (this), superclass.prototype.initialize.call (this) }

      if ( superclass ) HTMLCustomElement.__proto__ = superclass;
      HTMLCustomElement.prototype = Object.create( superclass && superclass.prototype );
      HTMLCustomElement.prototype.constructor = HTMLCustomElement;

      var prototypeAccessors = { context: {},templates: {} };

      prototypeAccessors.context.get = function () { return self };
      prototypeAccessors.context.set = function (value) { self = value };
      prototypeAccessors.templates.get = function () { return this.selectAll ('template') };

      HTMLCustomElement.prototype.render = function () { this.tokens.bind (this.context) };

      // custom element reactions
      HTMLCustomElement.prototype.connectedCallback = function () {

        void ( superclass.prototype.constructor.onconnect
          || superclass.prototype.connectedCallback
          || function noop () {}
        ).call (this)

        this.render ()
      };

      Object.defineProperties( HTMLCustomElement.prototype, prototypeAccessors );

      return HTMLCustomElement;
    }(( ParentNode ( EventTarget ( GlobalEventHandlers ( HTMLElement ))))));

    try
      { CustomElementRegistry.define (tag, HTMLCustomElement) }

    finally
      { return CustomElementRegistry.get (tag) }
  }
}

// Assign `window.Element.prototype` in case of feature checking on `Element`
Element.prototype = ElementPrototype
  // http://2ality.com/2013/09/window.html
  // http://tobyho.com/2013/03/13/window-prop-vs-global-var
  // https://github.com/webcomponents/webcomponentsjs/blob/master/webcomponents-es5-loader.js#L19

