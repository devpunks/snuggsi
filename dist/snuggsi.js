// http://nshipster.com/method-swizzling/
// HTMLElement Swizzle - To swizzle a method is to change a class’s dispatch table in order to resolve messages from an existing selector to a different implementation, while aliasing the original method implementation to a new selector.

// 3.2.3 HTML element constructors
// https://html.spec.whatwg.org/multipage/dom.html#html-element-constructors
// Satisfy Element interface document.createElement
//   - https://dom.spec.whatwg.org/#concept-element-interface


//// base class to extend, same trick as before
//class HTMLCustomElement extends HTMLElement {

//  constructor(_)
//    { return (_ = super(_)).init(), _; }

//  init()
//    { /* override as you like */ }
//}

var HTMLElement =

( function (_) {
  function E () {}

  E.prototype =
    window.HTMLElement.prototype

  return E
})()

// http://jsfiddle.net/zaqtg/10
// https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker
// https://developer.mozilla.org/en-US/docs/Web/API/NodeIterator
// https://www.w3.org/TR/DOM-Level-2-Traversal-Range/traversal.html
// https://developer.mozilla.org/en-US/docs/Web/API/NodeFilter

var DOMTokenList = function (node, symbol) {
  var this$1 = this;


  var
    nodes = []
  , expression = /{(\w+|#)}/

  , visit = function (node) { return node.localName
          ? ELEMENT_NODE (node.attributes)
          : expression.test (node.textContent) && nodes.push (node); }

  , ELEMENT_NODE = function (attrs) { return [].slice
        .call (attrs)
        .map(function (attr) { return expression.test (attr.value) && nodes.push (attr); }); }

  , walker =
      document.createNodeIterator
        (node, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, visit, null)


  while (walker.nextNode ()) { 0 } // Walk all nodes and do nothing.


  for (var i = 0, list = nodes; i < list.length; i += 1)
    {
    node = list[i];

    (node.text = node.textContent)
      .match (/[^{]+(?=})/g)
      .map (function (symbol) { return (this$1 [symbol] || (this$1 [symbol] = [])).push (node); })
  }

};

DOMTokenList.prototype.bind = function (context) {
    var this$1 = this;


  var
    reset = function (symbol) { return this$1 [symbol].map // more than one occurrence
        (function (node) { return node.textContent = node.text; })
      && symbol; }

 // must both run independently not in tandem

  , restore = function (symbol) { return this$1 [symbol].map (function (node) { return (node.textContent =
           node.textContent
             .split ('{'+symbol+'}')
             .join(context [symbol])); }); }

  Object
    .keys (this)
    .map(reset)
    .map(restore)
};

// Preloading - https://w3c.github.io/preload
// Resource Hints - https://www.w3.org/TR/resource-hints
// https://jakearchibald.com/2017/h2-push-tougher-than-i-thought/#push-vs-preload
// http://w3c.github.io/webcomponents/spec/imports/#h-interface-import
// https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/12142852/
// Caching best practices - https://jakearchibald.com/2016/caching-best-practices/
//
//
// Link in body
//
// https://github.com/whatwg/html/commit/179983e9eb99efe417349a40ebb664bd11668ddd
// https://bugs.webkit.org/show_bug.cgi?id=172639
// https://github.com/whatwg/html/pull/616#issuecomment-180018260

void (function (Element) {
  var xhr = new XMLHttpRequest

  for (var i = 0, list = document.querySelectorAll ('link[id*="-"]'); i < list.length; i += 1) {

    var link = list[i];

    xhr.open ('GET', link.href)
    xhr.responseType = 'document'
    xhr.onload       = onload

    // this is kinda smelly!!!
    xhr.link         = link
    xhr.send ()
  }

  function onload () {
    var
      select =
        this
          .response
          .querySelectorAll
          .bind (this.response)

    , link = this.link

    , next = link.nextSibling

    , reflect = function (clone, node) { return function (attr) { return node [attr]
          && (clone [attr] = node [attr]); }; }

    for
      (var i = 0, list = document.querySelectorAll (link.id); i < list.length; i += 1)
        {
      var node = list[i];

      stamp.call
          (node, select ('template') [0].cloneNode (true))
    }


    for (var i$1 = 0, list$1 = select ('style,link,script'); i$1 < list$1.length; i$1 += 1) {
      var node$1 = list$1[i$1];

      var
        as = node$1.getAttribute ('as')

      , clone =
          document.createElement (node$1.localName)


      void ['src', 'href', 'textContent', 'rel']
        .map (reflect (clone, node$1))

      // use rel = 'preload stylesheet' for async
      // or use media=snuggsi => media || 'all' trick
      // loadCSS - https://github.com/filamentgroup/loadCSS
      // http://keithclark.co.uk/articles/loading-css-without-blocking-render
      'style' == as && (clone.rel = 'stylesheet')

      link.parentNode.insertBefore (clone, next)

      'script' == as &&
        (link.parentNode.insertBefore
          (document.createElement ('script'), next)
            .src = node$1.href)
    }
  }


  function stamp (template, insert, replacement) {
    var this$1 = this;


    for (var i = 0, list = this$1.querySelectorAll ('[slot]'); i < list.length; i += 1)
        {
      replacement = list[i];

      (template.content || template).querySelector
          ('slot[name='+ replacement.getAttribute ('slot') +']')
            .outerHTML = replacement.outerHTML
    }

    this.innerHTML = template.innerHTML
  }

}) ()

// https://people.cs.pitt.edu/~kirk/cs1501/Pruhs/Spring2006/assignments/editdistance/Levenshtein%20Distance.htm

// https://github.com/WebReflection/hyperHTML/pull/100

// https://skillsmatter.com/skillscasts/10805-an-isomorphic-journey-to-a-lighter-and-blazing-fast-virtual-dom-alternative#video

// https://github.com/webcomponents/template
var Template =

( function (template) {

  template.length
    && ( template = document.querySelector
       ( 'template[name=' + template + '' + ']' ) )

  var
    HTML   = template.innerHTML
  , anchor = template.nextSibling

  template.innerHTML = ''

  template.bind =
    bind.bind (template)

  return template

  function bind (context) {
    var this$1 = this;


    var
      fragment =
        document.createElement ('section')

    , deposit = function (html, context, index) {
        var clone = HTML

        typeof context != 'object'
          && ( context  = { self: context })

        context ['#'] = index

        for (var i in context)
          { clone = clone
            .split ('{'+i+'}')
            .join  (context [i]) }

        return html + clone
      }

    for (var i = 0, list = (this$1.dependents || [] ); i < list.length; i += 1)
            {
      var node = list[i];

      node.parentNode.removeChild (node)
    }


    fragment.innerHTML =
      []
        .concat (context)
        .reduce (deposit, '')


    for (var i$1 = 0, list$1 = this$1.dependents = // non-live nodelist
            [].slice.call (fragment.childNodes); i$1 < list$1.length; i$1 += 1)

        {
      var dependent = list$1[i$1];

      this$1
          .parentNode
          .insertBefore (dependent, anchor)
    }
  }
})

// The CustomElementRegistry Interface
// WHATWG - https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-api
//
// HTML Element Constructors
//   - https://html.spec.whatwg.org/multipage/dom.html#html-element-constructors
//
// The Custom Elements Spec
// W3C - https://w3c.github.io/webcomponents/spec/custom/
// WHATWG- https://html.spec.whatwg.org/multipage/custom-elements.htm
//
// Legacy webcomponentsjs
//   - https://github.com/webcomponents/custom-elements/blob/master/src/CustomElementRegistry.js
//
//   - CEReactions
//     - https://github.com/webcomponents/custom-elements/pull/62
//     - https://html.spec.whatwg.org/multipage/custom-elements.html#cereactions
//     - https://html.spec.whatwg.org/#cereactions


! window.customElements
  && (customElements = {/* microfill */})


new (function () {
  function CustomElementRegistry () {
    customElements.define
      = this.define.bind (this,  function (_) { return 0; } )
      //= this.define.bind (this,  customElements.define )
  }

  CustomElementRegistry.prototype.define = function ( native, name, constructor ) {
    // this.running = undefined
    //  definition = this.swizzle ( definition );

    (native).apply
      ( customElements, this.register ( name, constructor ) )
  };


  CustomElementRegistry.prototype.register = function () {

    'loading' == document.readyState

      ? addEventListener
        ('DOMContentLoaded', (ref = this).queue.apply ( ref, arguments ))

      : (ref$1 = this).queue.apply ( ref$1, arguments )()

    return arguments
    var ref;
    var ref$1;
  };


  CustomElementRegistry.prototype.queue = function ( name, constructor ) {
    var this$1 = this;

    return function (event) { return [].slice
        .call ( document.getElementsByTagName (name) )
        .map  ( this$1.upgrade, constructor.prototype ); }
  };


  // https://wiki.whatwg.org/wiki/Custom_Elements#Upgrading
  // "Dmitry's Brain Transplant"
  CustomElementRegistry.prototype.upgrade = function (element) {

    // Here's where we can swizzle
    // see this.swizzle ()
    Object.setPrototypeOf
      (element, this)
        .connectedCallback
          && element.connectedCallback ()
  };

  return CustomElementRegistry;
}())


// select the target node
var m = []

// create an observer instance
window.MutationObserver &&

new MutationObserver ( function (mutations) {
  for (var i = 0, list = mutations; i < list.length; i += 1) {
    var mutation = list[i];

    mutation
  }
})

.observe
  (document.body, { childList: true, subtree: true })
var ParentNode = function (Element) { return ((function (Element) {
    function anonymous () {
      Element.apply(this, arguments);
    }

    if ( Element ) anonymous.__proto__ = Element;
    anonymous.prototype = Object.create( Element && Element.prototype );
    anonymous.prototype.constructor = anonymous;

    anonymous.prototype.select = function ( )
    { return (ref = this).selectAll.apply ( ref, arguments ) [0]
    var ref; };

  anonymous.prototype.selectAll = function ( strings ) {
    var tokens = [], len = arguments.length - 1;
    while ( len-- > 0 ) tokens[ len ] = arguments[ len + 1 ];

    strings =
      [].concat ( strings )

    return [].slice.call
      (this.querySelectorAll
        (tokens.reduce // denormalize selector
          (function (part, token) { return part + token + strings.shift (); }
          , strings.shift ())))
  };

    return anonymous;
  }(Element))); }

//  comb (parent) {
//    // ElementTraversal interface
//    // https://www.w3.org/TR/ElementTraversal/#interface-elementTraversal
//
//    if (parent.hasChildNodes())
//      for (let node = parent.firstChild; node; node = node.nextSibling)
//        comb (node)
//  }

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


    // BIG BUG IN IE!!!
    //
    // https://connect.microsoft.com/IE/feedback/details/790389/event-defaultprevented-returns-false-after-preventdefault-was-called
    //
    // https://github.com/webcomponents/webcomponents-platform/blob/master/webcomponents-platform.js#L16

    return function (event) { return handler.call (this$1, event) !== false
        // check render availability
        && event.defaultPrevented
        || this$1.render (); }
  };

    return anonymous;
  }(HTMLElement))); }

var GlobalEventHandlers = function (Element) { return ((function (Element) {
    function anonymous () {
      Element.apply(this, arguments);
    }

    if ( Element ) anonymous.__proto__ = Element;
    anonymous.prototype = Object.create( Element && Element.prototype );
    anonymous.prototype.constructor = anonymous;

    anonymous.prototype.onconnect = function () {

//  RESERVED FOR IMPORTS WTF IS GOING ON
//  event
//    && (target = event.target)
//    && this.mirror
//      (target.import.querySelector ('template'))

    this.templates =
      this
        .selectAll ('template[name]')
        .map (Template)

    this.tokens =
      new DOMTokenList (this)

    Element.prototype.onconnect
      && Element.prototype.onconnect.call (this)
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

  anonymous.prototype.reflect = function (handler) {

    /^on/.test (handler) // `on*`
      && handler // is a W3C event
        in HTMLElement.prototype

      && // automagically delegate event
        this.on ( handler.substr (2), this [handler] )
  };

  anonymous.prototype.register = function (node, handler, event) {
    var this$1 = this;


    for (var i = 0, list = [].slice.call (node.attributes); i < list.length; i += 1)
            {
      var attribute = list[i];

      /^on/.test (event = attribute.name)
            // https://www.quirksmode.org/js/events_tradmod.html
            // because under traditional registration the handler value is wrapped in scope `{ onfoo }`
            && ( handler = (/{\s*(\w+)/.exec (node [event]) || []) [1])
            && ( node [event] = this$1.renderable (this$1 [handler]) )
    }
  };

    return anonymous;
  }(Element))); }

var Custom = function (Element) { return ( (function (superclass) {
    function anonymous () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) anonymous.__proto__ = superclass;
    anonymous.prototype = Object.create( superclass && superclass.prototype );
    anonymous.prototype.constructor = anonymous;

    anonymous.prototype.connectedCallback = function () {
    this.context = {}

    superclass.prototype.initialize
      && superclass.prototype.initialize.call (this)

    Object
      .getOwnPropertyNames (Element.prototype)
      .map (this.reflect, this)

    this.onconnect ()
    this.render    ()
  };


  anonymous.prototype.render = function (template) {
    var this$1 = this;


    for (var i = 0, list = this$1.templates; i < list.length; i += 1)
      {
      template = list[i];

      template.bind
        (this$1 [template.getAttribute ('name')])
    }

    this
      .tokens
      .bind (this)

    void

    [this]
      .concat (this.selectAll ('*'))
      .map    (this.register, this)

    superclass.prototype.onidle && superclass.prototype.onidle.call (this)
  };

    return anonymous;
  }(( ParentNode
  ( EventTarget
  ( GlobalEventHandlers
  ( Element ))))))); }

// http://2ality.com/2013/09/window.html
// http://tobyho.com/2013/03/13/window-prop-vs-global-var

var Element =

( function (_) {

  var E = function (tag) {

//      const constructor =// swizzle
//        typeof tag === 'string'
//    //    ? HTMLCustomElement
//    //    : HTMLElement

        //https://gist.github.com/allenwb/53927e46b31564168a1d
        // https://github.com/w3c/webcomponents/issues/587#issuecomment-271031208
        // https://github.com/w3c/webcomponents/issues/587#issuecomment-254017839

      return function (klass) { return window.customElements.define
          ( tag + '', Custom (klass)); }
    }

  // Assign `window.Element.prototype` in case of feature checking on `Element`
//  E.prototype = Element.prototype

  return E

}) ()


