var CustomElementRegistry = function () {};

CustomElementRegistry.prototype.define = function (tag, constructor) {
  console.warn ('WHAT THE FUCK THIS WORKED FOR IE!!!!')
  console.warn ('tag:', tag)
  console.warn ('class definition:', constructor)
};

// WHATWG Custom Elements Spec - https://html.spec.whatwg.org/multipage/custom-elements.htm

window.customElements
  = window.customElements
  || CustomElementRegistry

(new window.customElements).define ('foo-bar')
var HTMLLinkElement = function

  // http://w3c.github.io/webcomponents/spec/imports/#h-interface-import

(tag) {

  var
    evt = new Event ('load')

  , target = document.querySelector // use CSS :any ?
      ('link[href*='+tag+'][rel=import]')

  // https://github.com/webcomponents/html-imports#htmlimports
  ;(evt.target = target)
    && window.HTMLImports
    && !!! window.HTMLImports.useNative
    && HTMLImports.whenReady ( function (_) { return target.dispatchEvent (evt); } ) // eww

  return target
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
    .match (/([^{]*?)(\w|#)(?=\})/g)
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

            return function (item) { return (item.textContent = item.textContent.replace (token, context [symbol])); };
    }

  keys.map (reset)

  for (var symbol$1 in this$1)
    { this$1 [symbol$1]
      .map (replace (symbol$1)) }
};

// INTERESTING! Converting `Template` to a class increases size by ~16 octets

var Template = HTMLTemplateElement = function (template) {

  template =
    (typeof template == 'string')
      ? document.querySelector ('template[name='+template+']')
      : template

  // create shallow clone using `.getOwnPropertyDescriptors`
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors#Examples
  // https://docs.microsoft.com/en-us/scripting/javascript/reference/object-getownpropertydescriptor-function-javascript
  // NO IE SUPPORT!!!!
  return Object.assign (template, { bind: bind } )

  function bind (context) {

    var
      html     = ''
    , template = this.innerHTML
    , contexts =
        (ref = []).concat.apply ( ref, [context] )
        // https://dom.spec.whatwg.org/#converting-nodes-into-a-node

    , keys =
        Object
          .keys (contexts [0] || [])    // memoize keys
          .concat (['#', 'self']) // add helper keys

    , tokens   = keys.map (function (key) { return '{'+key+'}'; }) // memoize tokens
    , fragment = document.createElement ('template')

    , deposit = function (context, index) {
        var clone = template

        context = (typeof context  === 'object')
          ? context : { self: context }

        context ['#'] = index

        for (var i=0; i<tokens.length; i++)
          { clone = clone
            .split (tokens [i])
            .join  (context [keys [i]]) }

        return clone
      }

    void (this.dependents || [])
      .map (function (dependent) { return dependent.remove (); })

    for (var i=0, final = ''; i<contexts.length; i++)
      { html += deposit (contexts [i], i) }

    fragment.innerHTML = html

    this.dependents = Array.from // non-live
      (fragment.content.childNodes)

    (ref$1 = this).after.apply ( ref$1, this.dependents )
    var ref;
    var ref$1;
  }
}
var EventTarget = function (HTMLElement) { return ((function (HTMLElement) {
    function anonymous () {
      HTMLElement.apply(this, arguments);
    }

    if ( HTMLElement ) anonymous.__proto__ = HTMLElement;
    anonymous.prototype = Object.create( HTMLElement && HTMLElement.prototype );
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
  }(HTMLElement))); }

var ParentNode = function (Element) { return ((function (Element) {
    function anonymous () {
      Element.apply(this, arguments);
    }

    if ( Element ) anonymous.__proto__ = Element;
    anonymous.prototype = Object.create( Element && Element.prototype );
    anonymous.prototype.constructor = anonymous;

    anonymous.prototype.selectAll = function ( fragments ) {
    var tokens = [], len = arguments.length - 1;
    while ( len-- > 0 ) tokens[ len ] = arguments[ len + 1 ];

    fragments =
      (ref = []).concat.apply ( ref, [fragments] )

    var
      zip = function (selector, token) { return selector + token + fragments.shift (); }

    return Array
      .from
        (this.querySelectorAll
          (tokens.reduce (zip, fragments.shift ())))
    var ref;
  };

  anonymous.prototype.select = function ()
    // watch out for clobbering `HTMLInputElement.select ()`
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/select
    {
    var selector = [], len = arguments.length;
    while ( len-- ) selector[ len ] = arguments[ len ];
 return (ref = this).selectAll.apply ( ref, selector ) [0]
    var ref; };

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

    anonymous.prototype.onconnect = function (event, target) {

    (target = event.target)
      && this.mirror (target.import.querySelector ('template'))

    Element.prototype.onconnect
      && Element.prototype.onconnect.call (this)

    this.tokens = new TokenList (this)
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

  anonymous.prototype.reflect = function (handler, event) {
    ( event = ( handler.match (/^on(.+)$/) || [] ) [1] )

    && Object.keys // ensure W3C on event
     ( HTMLElement.prototype )
       .includes ( handler )

    && this.on (event, this [handler])
  };

  anonymous.prototype.register = function (node) {
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

var Component = function (HTMLElement) { return ( (function (superclass) {
    function anonymous () {
  var this$1 = this;
 superclass.call (this)

    var
      descriptions =
        Object.getOwnPropertyDescriptors
          (HTMLElement.prototype)

    , bind = function (key) { return 'function' === typeof descriptions [key].value
        && (this$1 [key] = this$1 [key].bind (this$1)); }

    Object
      .keys (descriptions)
      .map (bind)

    Object
      .getOwnPropertyNames (HTMLElement.prototype)
      // POTENTIAL REDUNDANCY
      // Aren't `on` events set up in `.bind` on 20?
      // If so we are `.bind`ing to `this` on two iterations
      // of the same function
      .map (this.reflect, this)

    this.context = {}
    this.initialize && this.initialize ()
  }

    if ( superclass ) anonymous.__proto__ = superclass;
    anonymous.prototype = Object.create( superclass && superclass.prototype );
    anonymous.prototype.constructor = anonymous;


  anonymous.prototype.connectedCallback = function (link) {
    link = HTMLLinkElement
      (this.tagName.toLowerCase ())

    link
      ? link.addEventListener ('load', this.onconnect.bind (this))
      : this.onconnect (new Event ('load'))
  };


  anonymous.prototype.render = function () {
    var this$1 = this;


    this.tokens.bind (this)


    Array
      .from
        (this.selectAll ('template[name]'))

      .map
        (function (template) { return template.getAttribute ('name'); })

      .map
        (function (name) { return (new Template (name)).bind (this$1 [name]); })


    Array
      .from (this.selectAll ('*'))

      .concat ([this])

      .map (this.register, this)


    superclass.prototype.onidle && superclass.prototype.onidle.call (this)
  };


  anonymous.prototype.mirror = function (template, insert) {
    var this$1 = this;


    template = template.cloneNode (true)

    insert = function (replacement, name, slot) { return (name = replacement.getAttribute ('slot')) &&

      (slot = template.content.querySelector ('slot[name='+name+']'))
         // prefer to use replaceWith however support is sparse
         // https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/replaceWith
         // using `Node.parentNode` - https://developer.mozilla.org/en-US/docs/Web/API/Node/parentNode
         // & `Node.replaceChid` - https://developer.mozilla.org/en-US/docs/Web/API/Node/replaceChild
         // as is defined in (ancient) W3C DOM Level 1,2,3
         .parentNode
         .replaceChild (replacement, slot); }

    for (var i = 0, list = this$1.selectAll ('[slot]'); i < list.length; i += 1)
      {
      var replacement = list[i];

      insert (replacement)
    }

    Array
      .from (template.attributes)

      // skip swapping attribute if setting exists
      .filter (function (attr) { return !!! this$1.attributes [attr.name]; })

      .map  (function (attr) { return this$1.setAttribute (attr.name, attr.value); })

    this.innerHTML = template.innerHTML
  };

    return anonymous;
  }(( EventTarget ( ParentNode ( GlobalEventHandlers ( HTMLElement ))))))); }

var ElementPrototype = window.Element.prototype // see bottom of this file

var Element = function (tag) { return function (Element) { return (ref = window.customElements).define.apply
        ( ref, (ref$1 = []).concat.apply ( ref$1, [tag]).concat( [Component (Element)] ))
        var ref;
        var ref$1;; }; }

// Assign `window.Element.prototype` in case of feature checking on `Element`
Element.prototype = ElementPrototype
  // http://2ality.com/2013/09/window.html
  // http://tobyho.com/2013/03/13/window-prop-vs-global-var
  // https://github.com/webcomponents/webcomponentsjs/blob/master/webcomponents-es5-loader.js#L19


