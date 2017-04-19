
var this$1 = this;
// INTERESTING! Converting `Template` to a class increases size by ~16 octets

//class Template {

//  constructor ( name = 'snuggsi' ) {
//    return Object.assign (this.factory (...name), { bind: this.bind })
//  }

//  bind (context) {
//    context = Array.isArray (context) ? context : [context]
//  }

//  factory (name) {
//    return (
//      document.querySelector ('template[name='+name+']').cloneNode (true)
//        || document.createElement ('template'))
//  }
//}

var Template = function ( name ) {
  if ( name === void 0 ) name = 'snuggsi';

  this.dependents = []

  return Object.assign
    (document.querySelector ('template[name='+name+']'), { bind: bind } )

  function tokenized (template) {
    var
      visit = function (node, filter) {
          if ( filter === void 0 ) filter = /({\w+})/g;

          return filter.exec (node.data) // stored regex is faster https://jsperf.com/regexp-indexof-perf
          && NodeFilter.FILTER_ACCEPT;
    }

    , walker = document.createNodeIterator
        (template.content, NodeFilter.SHOW_TEXT, visit)
        // by default breaks on template YAY! 🎉

    var
      node
    , nodes = []

    while (node = walker.nextNode ())
      { nodes.push (node) }

    return nodes
  }

  function bind (context) {
    var this$1 = this;

    this.dependents = this.dependents || []

    this.dependents
      .map (function (node) { return node.remove (); })


    context = Array.isArray (context) ? context : [context]

    var
      records = []

    for (var i = 0, list = context; i < list.length; i += 1) {
      var item = list[i];

      var
        clone  = this$1.cloneNode (true)
      , tokens = (new TokenList (tokenized (clone) ))

      tokens.bind (item)
      records.push (clone.content)
    }

    records.map (function (record) {
      (ref = this.dependents).push.apply (ref, record.childNodes)
      var ref;
    }, this)

    (ref = this).after.apply (ref, records)

    return this
    var ref;
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
    textify = function (node) { return (node.text = node.data, node); }

  , symbolize = function (symbol) { return symbol.match (/(\w+)/g) [0]; }

  , insert = function (token) { return function (symbol) { return this$1 [symbol] = token; }; }

  , tokenize = function (token) { return token.textContent
        .match (/{(\w+)}/g)
          .map (symbolize)
          .map (insert (token)); }

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

var ParentNode = function (prototype) { return ((function (prototype) {
    function anonymous () {
      prototype.apply(this, arguments);
    }

    if ( prototype ) anonymous.__proto__ = prototype;
    anonymous.prototype = Object.create( prototype && prototype.prototype );
    anonymous.prototype.constructor = anonymous;

    var prototypeAccessors = { texts: {},tokens: {} };

    anonymous.prototype.selectAll = function (selector)
    { return this.querySelectorAll (selector) };

  anonymous.prototype.select = function (selector)
    // watch out for clobbering `HTMLInputElement.select ()`
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/select
    { return this.selectAll (selector) [0] };

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

    return this._tokens =
      this._tokens || new TokenList (this.texts)
  };

    Object.defineProperties( anonymous.prototype, prototypeAccessors );

    return anonymous;
  }(prototype))); }

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
    function anonymous () {
      prototype.apply(this, arguments);
    }

    if ( prototype ) anonymous.__proto__ = prototype;
    anonymous.prototype = Object.create( prototype && prototype.prototype );
    anonymous.prototype.constructor = anonymous;

    anonymous.prototype.register = function (events) {
    var this$1 = this;
    if ( events === void 0 ) events = function (event) { return /^on/.exec (event); };


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
            && prototype [ handler ].bind (this$1)
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
        function (node) { return function (event) {
            node [event] = handle (node [event]) }; }

    , mirror = function (handler){ return !!! this$1 [handler]
        && (this$1 [handler] = prototype [handler].bind (this$1)); }


    void [this]
      .concat (children)
      .filter (registered)
      .map (reflect (this))

    Object
      .getOwnPropertyNames (prototype)
      .filter (events)
      .map (mirror)

    return this
  };

    return anonymous;
  }(prototype))); }
var ElementPrototype = window.Element.prototype // see bottom of this file

var Element = function
  //https://gist.github.com/allenwb/53927e46b31564168a1d
  // https://github.com/w3c/webcomponents/issues/587#issuecomment-271031208
  // https://github.com/w3c/webcomponents/issues/587#issuecomment-254017839

 ( tag, CustomElementRegistry )
{
if ( CustomElementRegistry === void 0 ) CustomElementRegistry = window.customElements;
 tag = tag [0]

  return function (HTMLElement) // https://en.wikipedia.org/wiki/Higher-order_function
  { // Should this be a class❓❓❓❓

    var context = this === window ? {} : this

//  try
//    { return new CustomElementRegistry.get (tag) }

//  catch (_)
//    { /* console.warn('Defining Element `'+tag+'` (class {})') */ }

    var HTMLCustomElement = (function (superclass) {
      function HTMLCustomElement () { superclass.call (this)
        this.context = context

        superclass.prototype.initialize && superclass.prototype.initialize.call (this)
      }

      if ( superclass ) HTMLCustomElement.__proto__ = superclass;
      HTMLCustomElement.prototype = Object.create( superclass && superclass.prototype );
      HTMLCustomElement.prototype.constructor = HTMLCustomElement;

      var prototypeAccessors = { context: {},templates: {} };

      prototypeAccessors.context.get = function ()
        { return self };

      prototypeAccessors.context.set = function (value)
        { self = value };

      prototypeAccessors.templates.get = function ()
        { return Array.from (this.selectAll ('template[name]')) };

      HTMLCustomElement.prototype.render = function () {
        // template = super.render ()
        // Where should this insert?
        // What about the meta elements (i.e. script, style, meta)

        this.tokens.bind (this)

        templatize.call (this, this.templates)

        function templatize (templates) {
          var this$1 = this;

          templates.forEach (function (template) {
            (new Template ([template.getAttribute ('name')]))
              .bind (this$1 [template.getAttribute ('name')] || [])
          })
        }

        this.register ()
      };

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
    }(EventTarget ( ParentNode ( GlobalEventHandlers ( HTMLElement )))));

//  try
//    {
        CustomElementRegistry.define (tag, HTMLCustomElement)
//    }

//  finally
//    {
        return CustomElementRegistry.get (tag)
//    }
  }
}

// Assign `window.Element.prototype` in case of feature checking on `Element`
Element.prototype = ElementPrototype
  // http://2ality.com/2013/09/window.html
  // http://tobyho.com/2013/03/13/window-prop-vs-global-var
  // https://github.com/webcomponents/webcomponentsjs/blob/master/webcomponents-es5-loader.js#L19

