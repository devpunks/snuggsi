var HTMLLinkElement = function

  // http://w3c.github.io/webcomponents/spec/imports/#h-interface-import

(tag) {

  var
    proxy = {}

  , link = document.querySelector // use CSS :any ?
      ('link#'+tag+'[rel=import], link[href*='+tag+'][rel=import]')

  , register = function (event, handler) { return (HTMLImports && !!! HTMLImports.useNative)
        ? HTMLImports.whenReady
            ( function (_) { return handler ({ target: link }); } ) // eww

        : link.addEventListener
            (event, handler); }


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

  this
    .sift (node)
    .map(this.tokenize, this)
};

TokenList.prototype.tokenize = function (node) {
    var this$1 = this;


  var
    insert = function (node) { return function (symbol) { return (this$1 [symbol] = this$1 [symbol] || []).push (node); }; }

  void (node.text = node.textContent)
    .match (/([^{]*?)\w(?=\})/g)
    .map (insert (node))
};

TokenList.prototype.sift = function (node) {

  var
    nodes = []
  , expression = /{(\w+|#)}/

  , visit = function (node) { return node.nodeType === Node.TEXT_NODE
        ? TEXT_NODE (node)
        : ELEMENT_NODE (node.attributes)
      && NodeFilter.FILTER_REJECT; } // We don't need 'em

  , TEXT_NODE = function (node) { return expression.test (node.textContent)
      && nodes.push (node); }

  , ELEMENT_NODE = function (attrs) { return Array
        .from (attrs)
        .map(function (attr) { return expression.test (attr.value) && nodes.push (attr); }); }

  , walker =
      document.createNodeIterator
        (node, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, visit)
        // by default breaks on template YAY! 🎉

  while (walker.nextNode ()) { 0 } // Walk all nodes and do nothing.

  return nodes
};

TokenList.prototype.bind = function (context) {
    var this$1 = this;


  var
    keys = Object.keys (this)

  , reset = function (symbol) { return this$1 [symbol].map
        (function (node) { return (node.textContent = node.text) && symbol; }); }

  , replace =
      function (symbol, token) {
            if ( token === void 0 ) token = '{'+symbol+'}';

            return function (item) { return item.textContent = item.textContent
            .replace (token, context [symbol] || token); };
    }

  keys.map (reset)

  for (var symbol$1 in this$1)
    { this$1 [symbol$1]
      .map (replace (symbol$1)) }
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

    template.innerHTML =
    contexts
      .map (function (context) { return context; })
      .map (function (context, index) {

      context =
        (typeof context  === 'object') ? context : { self: context }

      context ['#'] = index

      clone  = this$1.cloneNode (true)

      void (new TokenList (clone.content))
        .bind (context)

      return clone.innerHTML // immutable snapshot
    })
    .join ('')

    void (this.dependents || [])
      .map (function (dependent) { return dependent.remove (); })

    this.dependents =
      Array.from
        (template.content.childNodes)

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

    anonymous.prototype.on = function ( event, handler ) {

    this.addEventListener
      (event, this.renderable (handler))
  };

  anonymous.prototype.renderable = function ( handler ) {
    var this$1 = this;


    return function (event, render) {
        if ( render === void 0 ) render = true;

        return (event.prevent = function (_) { return (render = false) && event.preventDefault (); })

      && handler.call (this$1, event) !== false // for `return false`

      && render && this$1.render ();
    } // check render availability
  };

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

    anonymous.prototype.onconnect = function (event, document) {

    (document = event.target.import)
      && this.parse (document.querySelector ('template'))

    Element.prototype.onconnect
      && Element.prototype.onconnect.call (this)

    this.render ()
  };

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

  anonymous.prototype.introspect = function (handler, name) {
    ( name = ( handler.match (/^on(.+)$/) || [] ) [1] )

    && Object.keys // ensure W3C on event
     ( HTMLElement.prototype )
       .includes ( handler )

    && this.on (name, this [handler])
  };

  anonymous.prototype.reflect = function (node) {
    var this$1 = this;

    var
      register = function (event, handler) { return (handler = /{\s*(\w+)\s*}/.exec (node [event]))

        && ( handler = this$1 [ (handler || []) [1] ] )
        && ( node [event] = this$1.renderable (handler) ); }

    Array
      .from (node.attributes)
      .map (function (attr) { return attr.name; })
      .filter (function (name) { return /^on/.test (name); })
      .map (register)
  };

    return anonymous;
  }(Element))); }

var Component = function (Element) { return ( (function (superclass) {
    function anonymous () { superclass.call (this)

    this.context = {}
    this.tokens  = new TokenList (this)

    Object
      .getOwnPropertyNames (Element.prototype)
      .map (this.introspect, this)

    this.initialize && this.initialize ()
  }

    if ( superclass ) anonymous.__proto__ = superclass;
    anonymous.prototype = Object.create( superclass && superclass.prototype );
    anonymous.prototype.constructor = anonymous;

  anonymous.prototype.connectedCallback = function () {

    HTMLLinkElement
      (this.tagName.toLowerCase ())
        .addEventListener ('load', this.onconnect.bind (this))
  };

  anonymous.prototype.render = function () {
    var this$1 = this;


    this.tokens.bind (this)

    Array
      .from // templates with `name` attribute
        (this.selectAll ('template[name]'))

      .map
        (function (template) { return template.getAttribute ('name'); })

      .map
        (function (name) { return (new Template (name)).bind (this$1 [name]); })

    Array
      .from (this.selectAll ('*'))

      .concat ([this])

      .map (this.reflect, this)

    superclass.prototype.onidle && superclass.prototype.onidle.call (this)
  };

  anonymous.prototype.parse = function (template, insert) {
    var this$1 = this;


    template = template.cloneNode (true)

    insert = function (replacement, name, slot) { return (name = replacement.getAttribute ('slot')) &&
      (slot = template.content.querySelector ('slot[name='+name+']'))
         // prefer to use replaceWith however support is sparse
         // https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/replaceWith
         // using `Node.parentNode` & `Node.replaceChid` as is defined in (ancient) W3C DOM Level 1,2,3
         .parentNode
         .replaceChild (replacement, slot); }

    for (var i = 0, list = this$1.selectAll ('[slot]'); i < list.length; i += 1)
      {
      var node = list[i];

      insert (node)
    }

    Array
      .from (template.attributes)
      .map  (function (attr) { return this$1.setAttribute (attr.name, attr.value); })

    this.innerHTML = template.innerHTML
  };

    return anonymous;
  }(( EventTarget ( ParentNode ( GlobalEventHandlers ( Element ))))))); }

var ElementPrototype = window.Element.prototype // see bottom of this file

var Element =
  function (tag, CustomElementRegistry ) {
      if ( CustomElementRegistry === void 0 ) CustomElementRegistry = window.customElements;

      return function (Element) { return CustomElementRegistry
        .define.apply ( CustomElementRegistry, tag.concat( [Component (Element)] )); };
}

// Assign `window.Element.prototype` in case of feature checking on `Element`
Element.prototype = ElementPrototype
  // http://2ality.com/2013/09/window.html
  // http://tobyho.com/2013/03/13/window-prop-vs-global-var
  // https://github.com/webcomponents/webcomponentsjs/blob/master/webcomponents-es5-loader.js#L19


