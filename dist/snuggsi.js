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

/*
// Domenic discusses
// https://esdiscuss.org/topic/extending-an-es6-class-using-es5-syntax#content-1
I believe this will work in most cases:

function B() {
  const obj = new A();
  Object.setPrototypeOf(obj, new.target.prototype); // or B.prototype, but if you derive from B you'll have to do this dance again

  // use obj instead of this

  return obj;
}
Also, in general you should do

instead of

B.prototype = Object.create(A.prototype);
for slightly better semantics, including class-side inheritance and not clobbering .constructor.
*/

( function (_) {
  function E () {}

  E.prototype =
  // E.prototype.__proto__ = ???
  // https://github.com/visionmedia/supertest/blob/master/lib/agent.js

    window.HTMLElement.prototype

  // Prevent `.constructor` clobbering
  // E.__proto__ = window.HTMLElement

    // https://github.com/whatwg/html/issues/1704
    // E.prototype.__proto__
    //   = (E.__proto__ = HTMLElement).prototype

    // Domenic's method
    // Object
    //   .setPrototypeOf
    //     (Object.setPrototypeOf (B, A).prototype, A.prototype)

    return E
})()

// http://jsfiddle.net/zaqtg/10
// https://www.w3.org/TR/DOM-Level-2-Traversal-Range/traversal.html
//
// TreeWalker
//   - https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker
//   - https://github.com/tmpvar/jsdom/pull/1447
//
// NodeIterator -
//   - https://developer.mozilla.org/en-US/docs/Web/API/NodeIterator
//   - https://developer.mozilla.org/en-US/docs/Web/API/NodeFilter
//   - https://github.com/tmpvar/jsdom/blob/master/lib/jsdom/living/traversal/NodeIterator-impl.js

var TokenList = function (node) {
  var this$1 = this;


  var
    visit = function (node) { return node.attributes
        && [].slice
             .call (node.attributes)
             .map(collect)
        || collect (node); }

  , collect = function (node) {
      console.log ('text content', node.textContent);

      /{(\w+|#)}/.test (node.textContent)
        && (node.text = node.textContent)
            .match (/[^{]+(?=})/g)
            .map (function (symbol) { return (this$1 [symbol] || (this$1 [symbol] = [])).push (node); })
  }

  , walker =
      document.createNodeIterator
        (node, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, visit, null)


  while (walker.nextNode ()) { null } // Walk all nodes and do nothing.
};


TokenList.prototype.bind = function (context) {

  var
  // FOR GOD'S SAKE PLEASE TEST THIS!!!
 // must both run independently not in tandem

    tokenize = function (symbol) { return function (node) { return (node.textContent
        = node.textContent
        .split ('{'+symbol+'}')
        .join(context [symbol])); }; }


  for (var symbol in this) {
    console.log ('symbol', symbol)

    this [symbol]
      .map (function (node) { return (node.textContent = node.text) && node; })
  }


  for (var symbol$1 in this)
    { this [symbol$1]
      // more than one occurrence
      .map (tokenize (symbol$1)) }
};

// https://codereview.chromium.org/1987413002
// https://github.com/whatwg/fetch/pull/442
// https://chromium.googlesource.com/chromium/src.git/+/a5a314d3249ecf1c291b417fbe067e8c2a65fad2
//
// Link rel preload as attribute doesn't support the as=document value
// https://bugs.chromium.org/p/chromium/issues/detail?id=593267
//
// Requests with useStreamOnResponse flag don't reuse preloaded resources
// https://bugs.chromium.org/p/chromium/issues/detail?id=652228
//
// Spurious warning preloading script
// https://bugs.chromium.org/p/chromium/issues/detail?id=655698
//
// WPT
// https://github.com/w3c/web-platform-tests/pull/4505
//
// w3c preload Tighter definition of "load was successful"
// https://github.com/w3c/preload/issues/83
void (function (_) {

  //create an observer instance
  // Can always default to DOMContentLoaded
  // https://bugs.webkit.org/show_bug.cgi?id=38995#c26
  (new MutationObserver ( function (mutations) {

    for (var i$1 = 0, list$1 = mutations; i$1 < list$1.length; i$1 += 1)
      {
      var mutation = list$1[i$1];

      for (var i = 0, list = mutation.addedNodes; i < list.length; i += 1) {
         var node = list[i];

          /^p/.test (node.rel)
           && /\-/.test (node.id)
           && load (node)

         !! /\-/.test (node.localName)
           && (link = document.querySelector ('#'+node.localName))
           && link.content
           && stamp.call (node, link.content)
           && customElements.upgrade (node)
      }
    }
  }))

  .observe (document.documentElement, { childList: true, subtree: true })

  void

  [].slice
    .call (document.querySelectorAll ('[rel^=pre][id~="-"]'))
    .map  (load)


  // XHR Specs
  // https://xhr.spec.whatwg.org
  // Progress events
  // https://xhr.spec.whatwg.org/#interface-progressevent
  // Loader - https://trac.webkit.org/browser/trunk/WebCore/loader/loader.cpp
  function load (link) {

    var xhr = new XMLHttpRequest

    // Destination - https://fetch.spec.whatwg.org/#requestdestination

    xhr.link   = link
    xhr.onload = onload
    // progress events won't fire unless defining before open
    xhr.open ('GET', link.href)
    xhr.responseType = 'document'
    // Max requests
    xhr.send ()
  }


  // https://github.com/w3c/preload/pull/40
  // https://bugs.webkit.org/show_bug.cgi?id=38995
  // https://www.w3.org/TR/html5/document-metadata.html#the-link-element
  function onload () {
    var
      link = this.link

    , response =
        this.response

    , anchor =
        link.nextChild

    , template =
        link.content =
           response.querySelector ('template')

    // https://www.nczonline.net/blog/2010/09/28/why-is-getelementsbytagname-faster-that-queryselectorall
    for (var i = 0, list = document.querySelectorAll (link.id); i < list.length; i += 1)
      {
      var node = list[i];

      template && stamp.call (node, template)
    }


    for (var i$1 = 0, list$1 = response.querySelectorAll ('style,link,script'); i$1 < list$1.length; i$1 += 1)
      {
      var node$1 = list$1[i$1];

      process (link, node$1, anchor)
    }
  }


  function process (link, node, anchor) {
      var
        // https://chromium.googlesource.com/chromium/src.git/+/0661feafc9a84f03b04dd3719b8aaa255dfaec63/third_party/WebKit/Source/core/loader/LinkLoader.cpp
        // HTML WhatWG scripting
        // https://html.spec.whatwg.org/multipage/scripting.html
        // https://html.spec.whatwg.org/multipage/scripting.html#prepare-a-script
        // Classic script graph - https://html.spec.whatwg.org/multipage/webappapis.html#fetch-a-classic-script
        // Module script tree - https://html.spec.whatwg.org/multipage/webappapis.html#fetch-a-module-script-tree
        // Concept Script script - https://html.spec.whatwg.org/multipage/scripting.html#concept-script-script
        as = node.getAttribute ('as')

      , clone =
          document.createElement
            ('script' == as ? as : node.localName)

      void

      // 'type' is used for data blocks (i.e. `type=text/recipe` or `type=application/x-game-data`
      // https://html.spec.whatwg.org/multipage/scripting.html#data-block
      ['id', 'rel', 'href', 'src', 'textContent', 'as', 'defer', 'crossOrigin' ]
        // setAttribute won't work for textContent and likewise explicit set for crossorigin
        .map (function (attr) { return node [attr] && attr in clone && (clone [attr] = node [attr]); })

      // use rel = 'preload stylesheet' for async
      // or use media=snuggsi => media || 'all' trick
      // loadCSS - https://github.com/filamentgroup/loadCSS
      // http://keithclark.co.uk/articles/loading-css-without-blocking-render
      'style' == as
      // https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for/#markup-based-async-loader
        && (clone.rel = 'stylesheet')

      'script' == as // smelly
        && (clone.src = clone.href)

      link
        .parentNode
        .insertBefore (clone, anchor)
  }

  // Slot replacement & light DOM stamping
  // https://github.com/w3c/webcomponents/issues/288
  // https://dom.spec.whatwg.org/#slot-assigned-nodes
  function stamp (template) {
    var this$1 = this;


    template =
      document.importNode (template, true)

    var slot

    [] // distribute attributes
      .slice
      .call (template.attributes)
      .map  (function (attr) { return !   this$1.attributes [attr.name]
        &&  this$1.setAttribute (attr.name, attr.value); })


    for (var i = 0, list = this.querySelectorAll ('[slot]'); i < list.length; i += 1)
      {
      var replacement = list[i];

      (slot = (template.content || template).querySelector
       ( 'slot[name=' + replacement.getAttribute ('slot') + ']' ))

      && // this could be slow
        slot.parentNode.replaceChild (replacement, slot)
    }

    return this.innerHTML = template.innerHTML
  }

}) ()

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
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Using_special_characters
            // https://stackoverflow.com/questions/1144783/how-to-replace-all-occurrences-of-a-string-in-javascript#answer-17606289
            .split ('{'+i+'}')
            .join  (context [i]) }

        return html + clone
      }

    for (var i = 0, list = (this.dependents || [] ); i < list.length; i += 1)
            // removeChild FAR faster
            // https://jsperf.com/innerhtml-vs-removechild/15
            {
      var node = list[i];

      node.parentNode.removeChild (node)
    }


    fragment.innerHTML
      =[]
        .concat (context)
        .reduce (deposit, '')


    for (var i$1 = 0, list$1 = this.dependents
          =[]
            .slice // non-live nodelist
            .call (fragment.childNodes); i$1 < list$1.length; i$1 += 1)

        {
      var dependent = list$1[i$1];

      this
          .parentNode
          .insertBefore (dependent, anchor)
    }
  }
}

window.customElements =
  window.customElements
  || {/* microfill */}

new /*@__PURE__*/(function () {
  function anonymous () {

    customElements.define
      = this.define.bind (this)

    customElements.upgrade
      = this.upgrade.bind (this)
  }


  anonymous.prototype.define = function ( name, constructor ) {

    this [name] = constructor

    void

    [].slice
      // https://www.nczonline.net/blog/2010/09/28/why-is-getelementsbytagname-faster-that-queryselectorall
      .call ( document.querySelectorAll (name) )
      .map  ( this.upgrade, this )
  };


  // "Dmitry's Brain Transplant"
  // https://wiki.whatwg.org/wiki/Custom_Elements#Upgrading
  anonymous.prototype.upgrade = function (node) {

    // Here's where we can swizzle
    // https://github.com/whatwg/html/issues/1704#issuecomment-241881091
    this [node.localName]

    &&

    Object
      .setPrototypeOf (node, this [node.localName].prototype)
      .connectedCallback ()
  };

  return anonymous;
}())

var ParentNode = function (Element) { return (/*@__PURE__*/(function (Element) {
    function anonymous () {
      Element.apply(this, arguments);
    }

    if ( Element ) anonymous.__proto__ = Element;
    anonymous.prototype = Object.create( Element && Element.prototype );
    anonymous.prototype.constructor = anonymous;

    anonymous.prototype.select = function ( )
    {
    var ref;
 return (ref = this).selectAll.apply ( ref, arguments ) [0] };

  anonymous.prototype.selectAll = function ( strings ) {
    var tokens = [], len = arguments.length - 1;
    while ( len-- > 0 ) tokens[ len ] = arguments[ len + 1 ];

    strings = [ ].concat ( strings )

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

var EventTarget = function (HTMLElement) { return (/*@__PURE__*/(function (HTMLElement) {
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

var GlobalEventHandlers = function (Element) { return (/*@__PURE__*/(function (Element) {
    function anonymous () {
      Element.apply(this, arguments);
    }

    if ( Element ) anonymous.__proto__ = Element;
    anonymous.prototype = Object.create( Element && Element.prototype );
    anonymous.prototype.constructor = anonymous;

    anonymous.prototype.onconnect = function () {

    this.templates =
      this
        .selectAll ('template[name]')
        .map (Template)

    this.tokens =
      new TokenList (this)

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
    for (var i = 0, list = [].slice.call (node.attributes); i < list.length; i += 1)
            {
      var attribute = list[i];

      /^on/.test (event = attribute.name)
            // https://www.quirksmode.org/js/events_tradmod.html
            // because under traditional registration the handler value is wrapped in scope `{ onfoo }`
            && ( handler = (/{\s*(\w+)/.exec (node [event]) || []) [1])
            && ( node [event] = this.renderable (this [handler]) )
    }
  };

    return anonymous;
  }(Element))); }

var Custom = function (Element) { return ( /*@__PURE__*/(function (superclass) {
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

    for (var i = 0, list = this.templates; i < list.length; i += 1)
      {
      var template = list[i];

      template.bind
        (this [template.getAttribute ('name')])
    }

    this
      .tokens
      .bind (this)

    this.register (this)

    this
      // possibly restrict to elements with on event
      .selectAll ('*')
      .map (this.register, this)

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

