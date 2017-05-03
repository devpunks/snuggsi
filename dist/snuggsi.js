
var this$1 = this;
var HTMLLinkElement = function (tag) {
  console.log (tag)

  var
    link =
      document
        .querySelector // use CSS :any ?
          ('link#'+tag+'[rel=import], link[href*='+tag+'][rel=import]')
    || {}

    Object
      .defineProperty (link, 'onload', {

        set: function (handler) {
          (!!! HTMLImports.useNative) ?
              HTMLImports.whenReady // eww
              // https://github.com/webcomponents/html-imports#htmlimports
              ( function (_) { return handler ({ target: link }); } )
          : handler ({ target: link })
        }
      })

  return link
}

var TokenList = function (node) {
  var this$1 = this;


  var
    textify = function (node) { return (node.text = node.textContent, node); }

  , tokenize = function (token) { return token.textContent
        .match (/{(\w+|#)}/g)
          .map (symbolize)
          .map (insert (token)); }

  , symbolize = function (symbol) { return symbol.match (/(\w+|#)/g) [0]; }

  , insert = function (token) { return function (symbol) { return (this$1 [symbol] = this$1 [symbol] || [])
          && this$1 [symbol].push (token); }; }

  this
    .sift (node)
    .map(textify)
    .map(tokenize)
};

TokenList.prototype.sift = function (node) {

  var
    nodes = []

  , visit = function (node) { return node.nodeType === Node.TEXT_NODE
        ? (TEXT_NODE (node) && NodeFilter.FILTER_ACCEPT)
        : ELEMENT_NODE (node.attributes) && NodeFilter.FILTER_REJECT; }

  , TEXT_NODE = function (node) { return (node.nodeType === Node.TEXT_NODE)
        && /{(\w+|#)}/.test (node.textContent); }

  , ELEMENT_NODE = function (attributes) { return Array
        .from (attributes || [])
        .filter (function (attr) { return /{(\w+|#)}/g.test (attr.value); })
        .map (function (attribute) { return nodes.push (attribute); }); }

  , walker =
      document.createNodeIterator
        (node, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, visit)
        // by default breaks on template YAY! 🎉

  while
    (node = walker.nextNode ())
      { nodes.push (node) }

  return nodes
};

TokenList.prototype.bind = function (context, node) {
    var this$1 = this;


  var
    prepare = function (symbol) { return this$1 [symbol]
        .map (function (token) { return token.textContent = token.text; })
      && symbol; }

  , replace = function (symbol) { return this$1 [symbol]
        .map (replacement (symbol)); }

  , replacement = function (symbol) { return function (item) { return item.textContent = item.textContent
          .replace ('{'+symbol+'}', context [symbol]); }; }

  Object
    .keys (this)
    .map(prepare)
    .map(replace)

  return this
};

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

var Template = function (name) {

  return Object.assign
    (document.querySelector ('template[name='+name+']'), { bind: bind } )

  function bind (context) {
    var this$1 = this;

    this.dependents = this.dependents || []

    context = Array.isArray (context) ? context : [context]

    var
      dependent = undefined

    var
      records = []

    while
      (dependent = this.dependents.pop ())
        { dependent.remove () }

    context.forEach (function (item, index) {

      var
        clone  = this$1.cloneNode (true)
      , tokens = (new TokenList (clone.content))

      item =
        typeof item === 'object'
          ? item
          : { self: item }

      item ['#'] = index

      tokens.bind  (item)
      records.push (clone.content)
    })

    records.map
      (function (record) { (ref = this.dependents).push.apply (ref, record.childNodes)
      var ref; }, this)

    (ref = this)
      .after.apply (ref, records)

    return this
    var ref;
  }
}
var EventTarget = function (Element) { return ((function (Element) {
    function anonymous () {
      Element.apply(this, arguments);
    }

    if ( Element ) anonymous.__proto__ = Element;
    anonymous.prototype = Object.create( Element && Element.prototype );
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
    if ( listener === void 0 ) listener = this$1 [event];
 this.addEventListener (event, listener) };

    return anonymous;
  }(Element))); }

var ParentNode = function (Element) { return ((function (Element) {
    function anonymous () {
      Element.apply(this, arguments);
    }

    if ( Element ) anonymous.__proto__ = Element;
    anonymous.prototype = Object.create( Element && Element.prototype );
    anonymous.prototype.constructor = anonymous;

    var prototypeAccessors = { tokens: {} };

    anonymous.prototype.selectAll = function (selector)
    { return this.querySelectorAll (selector) };

  anonymous.prototype.select = function (selector)
    // watch out for clobbering `HTMLInputElement.select ()`
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/select
    { return this.selectAll (selector) [0] };

  prototypeAccessors.tokens.get = function () {
    return this._tokens = // This is Janky
      this._tokens || new TokenList (this)
  };

    Object.defineProperties( anonymous.prototype, prototypeAccessors );

    return anonymous;
  }(Element))); }

//function comb
//  // ElementTraversal interface
//  // https://www.w3.org/TR/ElementTraversal/#interface-elementTraversal
//
//(parent) {
//  if (parent.hasChildNodes())
//    for (let node = parent.firstChild; node; node = node.nextSibling)
//      comb (node)
//}

var GlobalEventHandlers = function (Element) { return ((function (Element) {
    function anonymous () {
      Element.apply(this, arguments);
    }

    if ( Element ) anonymous.__proto__ = Element;
    anonymous.prototype = Object.create( Element && Element.prototype );
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
            && Element [ handler ].bind (this$1)
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

    , mirror = function (handler) { return !!! this$1 [handler] == undefined &&
           (this$1 [handler] = Element [handler].bind (this$1)); }

    void [this]
      .concat (children)
      .filter (registered)
      .map (reflect (this))

    Object
      .getOwnPropertyNames (Element)
      .filter (events)
      .map (mirror)

    return this
  };

    return anonymous;
  }(Element))); }

var Component = function (Element) { return ((function (superclass) {
    function anonymous () { superclass.call (this)

    this.context = {}

    this.initialize && this.initialize ()
  }

    if ( superclass ) anonymous.__proto__ = superclass;
    anonymous.prototype = Object.create( superclass && superclass.prototype );
    anonymous.prototype.constructor = anonymous;

  anonymous.prototype.render = function () {
    // template = super.render ()
    // Where should this insert?
    // What about the meta elements (i.e. script, style, meta)

    console.log ('rendering', this)

    this.tokens.bind (this)

    void (function (templates) {
      var this$1 = this;


      var
        bind = function (template) {
          var
            name = template.getAttribute ('name')

          void (new Template (name))
            .bind (this$1 [name])
        }

      templates.map (bind)
    })
    .call (this, Array.from (this.selectAll ('template[name]')))

    this.register ()

    this.constructor.onready &&
      this.constructor.onready.call (this)
  };

  // custom element reactions
  anonymous.prototype.connectedCallback = function () {

    var
      link =
        new HTMLLinkElement
          (this.tagName.toLowerCase ())

    link.onload =
      this.clone.bind (this)
  };

  anonymous.prototype.clone = function (event) {
    console.log ('cloning', event.target)
    console.log ('wat', this, event.target)

    var
      d = event.target.import
    , template =
        d && d.children[0]

    console.log ('document', this, template )

    this.render ()
  };

    return anonymous;
  }((EventTarget
  ( ParentNode
    ( GlobalEventHandlers
      ( Element ))))))); }

var ElementPrototype = window.Element.prototype // see bottom of this file

var Element = function
  (tag, CustomElementRegistry )

  //https://gist.github.com/allenwb/53927e46b31564168a1d
  // https://github.com/w3c/webcomponents/issues/587#issuecomment-271031208
  // https://github.com/w3c/webcomponents/issues/587#issuecomment-254017839

{
if ( CustomElementRegistry === void 0 ) CustomElementRegistry = window.customElements;
 tag = tag [0]

  return function (HTMLElement) // https://en.wikipedia.org/wiki/Higher-order_function
  { // Should this be a class❓❓❓❓

    var
      context =
        this === window ?
          {} : this

//  try
//    { return new CustomElementRegistry.get (tag) }

//  catch (_)
//    { /* console.warn('Defining Element `'+tag+'` (class {})') */ }


//  try
//    {
        CustomElementRegistry.define
          (tag, Component (HTMLElement))
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

