var HTMLLinkElement = function

  // http://w3c.github.io/webcomponents/spec/imports/#h-interface-import

(tag) {

  var
    proxy = {}

  , link = document.querySelector // use CSS :any ?
      ('link#'+tag+'[rel=import], link[href*='+tag+'][rel=import]')

  , register = function (event, handler) { return (HTMLImports && !!! HTMLImports.useNative)
        // https://github.com/webcomponents/html-imports#htmlimports
        ? HTMLImports.whenReady ( function (_) { return handler ({ target: link }); } ) // eww
        : link.addEventListener (event, handler); }

    Object
      .defineProperties (proxy, {

        'addEventListener': {
          writable: false,

          value: function (event, handler) {
            !!! link
              ? handler  ({ target: proxy })
              : register (event, handler)
          }
        }

// TODO: definition for onerror
//    , 'onerror':
//        { set (handler) {} }
      })

  return proxy
}

var TokenList = function (node) {
  var this$1 = this;


  var
    tokenize = function (node) { return (node.text = node.textContent)

      && node.textContent
          .match (/{(\w+|#)}/g)
            .map (function (symbol) { return symbol.match (/(\w+|#)/g) [0]; })
            .map (insert (node)); }

  , insert = function (token) { return function (symbol) { return (this$1 [symbol] = this$1 [symbol] || [])
          && this$1 [symbol].push (token); }; }

  this
    .sift (node)
    .map(tokenize)
};


TokenList.prototype.sift = function (node) {

  var
    nodes = []

  , visit = function (node) { return node.nodeType === Node.TEXT_NODE
        ? TEXT_NODE (node)
          && NodeFilter.FILTER_ACCEPT // Accept TEXT_NODEs

        : ELEMENT_NODE (node.attributes)
          && NodeFilter.FILTER_REJECT; } // reject ELEMENT_NODEs

  , TEXT_NODE = function (node) { return /{(\w+|#)}/.test (node.textContent); }

  , ELEMENT_NODE = function (attributes) { return Array
        .from (attributes)
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

TokenList.prototype.bind = function (context) {
    var this$1 = this;


  var
    replace = function (symbol) { return this$1 [symbol]
        .map (function (token) { return token.textContent = token.text; })

      && this$1 [symbol]
        .map (replacement (symbol)); }

  , replacement = function (symbol) { return function (item) { return item.textContent = item.textContent
          .replace ('{'+symbol+'}', context [symbol]); }; }

  Object
    .keys (this)

    .filter
      (function (key) { return context [key] !== undefined; })

    .map (replace)
};

// INTERESTING! Converting `Template` to a class increases size by ~16 octets

var HTMLTemplateElement = Template = function (name) {

  return Object.assign
    (document.querySelector ('template[name='+name+']'), { bind: bind } )

  function bind (context) {
    var this$1 = this;

    contexts = (ref = []).concat.apply ( ref, [context] )

    var
      clone
    , template = this.cloneNode (false)

    void (this.dependents || [])
      .map (function (dependent) { return dependent.remove (); })

    template.innerHTML =
    contexts.map (function (context, index) {

      context =
        (typeof context  === 'object') ? context : { self: context }

      context ['#'] = index

      clone  = this$1.cloneNode (true)

      void (new TokenList (clone.content))
        .bind (context)

      return clone.innerHTML // immutable snapshot
    })
    .join ('')

    this.dependents = Array.from(template.content.childNodes)
    this.after ( template.content )

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

    anonymous.prototype.connectedCallback = function () {

    new HTMLLinkElement
      (this.tagName.toLowerCase ())
        .addEventListener
          ('load', this.onimport.bind (this))
  };

  anonymous.prototype.on = function ( event, handler )

    // MDN EventTarget.addEventListener
    // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
    //
    // WHATWG Living Standard EventTarget.addEventListener
    // https://dom.spec.whatwg.org/#dom-eventtarget-removeeventlistener
    //
    // DOM Level 2 EventTarget.addEventListener
    // https://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget-addEventListener

    { this.addEventListener ( event, handler ) };

    return anonymous;
  }(Element))); }

var ParentNode = function (Element) { return ((function (Element) {
    function anonymous () {
      Element.apply(this, arguments);
    }

    if ( Element ) anonymous.__proto__ = Element;
    anonymous.prototype = Object.create( Element && Element.prototype );
    anonymous.prototype.constructor = anonymous;

    anonymous.prototype.selectAll = function (selector)
    { return this.querySelectorAll (selector) };

  anonymous.prototype.select = function (selector)
    // watch out for clobbering `HTMLInputElement.select ()`
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/select
    { return this.selectAll (selector) [0] };

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

    anonymous.prototype.onimport = function (event, root) {
    if ( root === void 0 ) root = event.target.import;


    root &&
      this.clone
        (root.querySelector ('template'))


    // dispatch `import`
    // and captured from `EventTarget`
    Element.onconnect &&
      Element.onconnect.call (this)

    // dispatch `render`
    // and captured from `EventTarget`
    this.render ()
  };

  anonymous.prototype.register = function (onevents) {
    var this$1 = this;
    if ( onevents === void 0 ) onevents = function (attr) { return /^on/.test (attr.name || attr); };


    var
      mirror = function (handler) { return (this$1 [handler] === null) && // ensure W3C on event
          (this$1 [handler] = Element [handler].bind (this$1)); }

    , nodes = // CSS :not negation https://developer.mozilla.org/en-US/docs/Web/CSS/:not
        // How can we select elements with on* attribute? (i.e. <... onclick=foo onblur=bar>)
        // If we can do this we can only retrieve the elements that have a traditional inline event.
        // This is theoretically more performant as most elements won't need traditional event registration.
        ':not(script):not(template):not(style):not(link)' // remove metadata elements

    , children =
        Array.from (this.querySelectorAll (nodes))

    , registered =
        function (node) { return Array
            .from   (node.attributes)
            .filter (onevents); }

    , reflect =
        function (node) { return Array
            .from   (node.attributes)
            .filter (onevents)
            .map (reflection (node)); }

    , reflection =
        function (node) { return function (event) { return (node [event] = handle (node [event])); }; }

    , handle =
        function (handler, ref) {
            if ( ref === void 0 ) ref = (/{\s*(\w+)\s*}/.exec (handler) || []);
            var _ = ref[0];
            var event = ref[1];

            return event
            && Element [event]
            && Element [event].bind (this$1)
            || handler // existing handler
            || null;
    }  // default for W3C on* event handlers


    Object // mirror class events to element
      .getOwnPropertyNames (Element)
      .filter (onevents)
      .map (mirror)

    void [this]
      .concat (children)
      .filter (registered)
      .map (reflect)
  };

    return anonymous;
  }(Element))); }

var Component = function (Element) { return ( (function (superclass) {
    function anonymous () { superclass.call (this)

    this.context = {}

    // dispatch `initialize`
    // and captured from `EventTarget`
    this.initialize
      && this.initialize ()

    this.tokens = new TokenList (this)
  }

    if ( superclass ) anonymous.__proto__ = superclass;
    anonymous.prototype = Object.create( superclass && superclass.prototype );
    anonymous.prototype.constructor = anonymous;

  anonymous.prototype.render = function () {

    this.tokens
      .bind (this)

//  Array
//    .from // templates with `name` attribute
//      (this.selectAll ('template[name]'))

//    .map
//      (template => template.getAttribute ('name'))

//    .map
//      (name => (new Template (name)).bind (this [name]))

    this.register ()

    // dispatch `idle`
    // and captured from `EventTarget`
    Element.onidle
//    Element.onidle.call (this) // TODO: Migrate to `EventTarget`
  };

  // This doesn't go here. Perhaps SlotList / Template / TokenList (in that order)
  anonymous.prototype.clone = function (template) {
    var this$1 = this;


    var
      fragment = template.content
        .cloneNode (true)

    , slots =
        Array.from (fragment.querySelectorAll ('slot'))

    , replace = function (replacement) { return slots
          .filter (match (replacement))
          .map (exchange (replacement)); }

    , match = function (replacement) { return function (slot) { return replacement.getAttribute ('slot')
            === slot.getAttribute  ('name'); }; }

    , exchange = function (replacement) { return function (slot) { return slot
            // prefer to use replaceWith however support is sparse
            // https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/replaceWith
            // using `Node.parentNode` & `Node.replaceChid` as is defined in (ancient) W3C DOM Level 1,2,3
            .parentNode
            .replaceChild (replacement, slot); }; }

    Array // map attributes from template
      .from (template.attributes)
      .map  (function (attribute) { return this$1.setAttribute (attribute.name, attribute.value); })

    Array // map slots from template
      .from (this.querySelectorAll ('[slot]'))
      .map  (replace)

    this.innerHTML = template.innerHTML
  };

    return anonymous;
  }(( EventTarget ( ParentNode ( GlobalEventHandlers ( Element ))))))); }

var ElementPrototype = window.Element.prototype // see bottom of this file

var Element =
  function (tag, CustomElementRegistry ) {
      if ( CustomElementRegistry === void 0 ) CustomElementRegistry = window.customElements;

      return function (Element) { return CustomElementRegistry.define.apply
        ( CustomElementRegistry, tag.concat( [Component (Element)] )); };
}

// Assign `window.Element.prototype` in case of feature checking on `Element`
Element.prototype = ElementPrototype
  // http://2ality.com/2013/09/window.html
  // http://tobyho.com/2013/03/13/window-prop-vs-global-var
  // https://github.com/webcomponents/webcomponentsjs/blob/master/webcomponents-es5-loader.js#L19


