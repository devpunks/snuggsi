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
        ? [].slice
            .call (node.attributes)
            .map(function (attr) { return expression.test (attr.value) && nodes.push (attr); })
        : expression
            .test (node.textContent) && nodes.push (node); }

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

void (function (_) {


  var
    process = function (link, nodes) {
      var next = link.nextSibling

      var loop = function () {
        var node = list[i];

        var
          // https://chromium.googlesource.com/chromium/src.git/+/0661feafc9a84f03b04dd3719b8aaa255dfaec63/third_party/WebKit/Source/core/loader/LinkLoader.cpp
          as = node.getAttribute ('as')

        , clone =
            document.createElement (node.localName)


//        [].slice.call (node.attributes)
//        .map (attr => attr.name)
//        .filter (name => name != 'as')
//        .concat ('textContent')
//        .map (attr => clone [attr] = node [attr])

        void ['id', 'src', 'href', 'textContent', 'rel' ]
          .map (function (attr) { return clone [attr] = node [attr]; })

        // use rel = 'preload stylesheet' for async
        // or use media=snuggsi => media || 'all' trick
        // loadCSS - https://github.com/filamentgroup/loadCSS
        // http://keithclark.co.uk/articles/loading-css-without-blocking-render
        'style' == as &&
        // https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for/#markup-based-async-loader
          (clone.rel = 'stylesheet')

        link.parentNode.insertBefore (clone, next)

        'script' == as &&
          (link.parentNode.insertBefore
            (document.createElement ('script'), next)
              .src = node.href)
        ;

        /^sc|st/.test (as) // script | style
          // preserves `as` attribute for link rel preload
          || (clone.as = node.as)
      };

      for (var i = 0, list = nodes; i < list.length; i += 1) loop();
    }

  // https://bugs.webkit.org/show_bug.cgi?id=38995
  // https://www.w3.org/TR/html5/document-metadata.html#the-link-element
  // https://github.com/w3c/preload/pull/40
  , onload = function (link) { return function () {
        var
          response =
            this.response

        , template =
            link.content =
               response.querySelector ('template')

        for (var i = 0, list = document.querySelectorAll (link.id); i < list.length; i += 1)
        //(let node of document.getElementsByTagName (link.id))
          {
          var node = list[i];

          template && stamp.call (node, template)
        }


        process (link, response.querySelectorAll ('style,link,script'))
      }; };

  [].slice
    .call (document.querySelectorAll ('link[rel^=pre][id*="-"]'))
    .map  (preload)


  // XHR Specs
  // https://xhr.spec.whatwg.org
  // Progress events
  // https://xhr.spec.whatwg.org/#interface-progressevent
  function preload (link) {

    var xhr = new XMLHttpRequest

    xhr.onload = onload (link)
    // progress events won't fire unless defining before open
    xhr.open ('GET', link.href)
    xhr.responseType = 'document'
    xhr.send ()
  }

  //create an observer instance
  // Can always default to DOMContentLoaded
  // https://bugs.webkit.org/show_bug.cgi?id=38995#c26
  (new MutationObserver ( function (mutations) {

    for (var i = 0, list = mutations; i < list.length; i += 1)
      {
      var mutation = list[i];

      for (var i$1 = 0, list$1 = mutation.addedNodes; i$1 < list$1.length; i$1 += 1) {
           var node = list$1[i$1];

          /^p/.test (node.rel)
             && /\-/.test (node.id)
             && preload (node)

        !! /\-/.test (node.localName)
          && (link = document.querySelector ('#'+node.localName))
          && link.content
          && stamp.call (node, link.content)
      }
    }
  }))

  .observe (document.documentElement, { childList: true, subtree: true })


  // Slot stamping
  // https://github.com/w3c/webcomponents/issues/288
  function stamp (template) {
    var this$1 = this;

    template = template.cloneNode (true)

    for (var i = 0, list = this$1.querySelectorAll ('[slot]'); i < list.length; i += 1) {
      var replacement = list[i];

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
var Template = function (template) {

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
}

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
  function anonymous () {
    customElements.define
      = this.define.bind (this,  function (_) { return 0; } )
      //= this.define.bind (this,  customElements.define )
  }

  anonymous.prototype.define = function ( native, name, constructor ) {
    // this.running = undefined
    //  definition = this.swizzle ( definition );

    (native).apply
      ( customElements, this.register ( name, constructor ) )
  };


  anonymous.prototype.register = function () {

    'loading' == document.readyState

      ? addEventListener
        ('DOMContentLoaded', (ref = this).queue.apply ( ref, arguments ))

      : (ref$1 = this).queue.apply ( ref$1, arguments )()

    return arguments
    var ref;
    var ref$1;
  };


  anonymous.prototype.queue = function ( name, constructor ) {
    var this$1 = this;

    return function (event) { return [].slice
        .call ( document.getElementsByTagName (name) )
        .map  ( this$1.upgrade, constructor.prototype ); }
  };


  // https://wiki.whatwg.org/wiki/Custom_Elements#Upgrading
  // "Dmitry's Brain Transplant"
  anonymous.prototype.upgrade = function (element) {

    // Here's where we can swizzle
    // see this.swizzle ()
    Object.setPrototypeOf
      (element, this)
        .connectedCallback
          && element.connectedCallback ()
  };

  // http://nshipster.com/method-swizzling/
  anonymous.prototype.swizzle = function ( constructor ) {
    //see elements/html-custom-element.es
    return new Function ('class extends HTMLElement {}')
  };

  return anonymous;
}())

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

    /^on/.test (handler) // is a W3C `on`event
      && handler in HTMLElement.prototype // `on*`

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


  anonymous.prototype.render = function () {
    var this$1 = this;


    for (var i = 0, list = this$1.templates; i < list.length; i += 1)
      {
      var template = list[i];

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

var Element = function (tag) { return (

//      const constructor =// swizzle
//        typeof tag === 'string'
//    //    ? HTMLCustomElement
//    //    : HTMLElement

        //https://gist.github.com/allenwb/53927e46b31564168a1d
        // https://github.com/w3c/webcomponents/issues/587#issuecomment-271031208
        // https://github.com/w3c/webcomponents/issues/587#issuecomment-254017839

      function (Element) { return customElements.define
          ( tag + '', Custom (Element) ); }

// Assign `window.Element.prototype` in case of feature checking on `Element`
//  E.prototype = Element.prototype
//  return E
); }

