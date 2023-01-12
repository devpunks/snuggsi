// HTTP/2
  - https://gitlab.com/sebdeckers/http2server#README
  - https://github.com/GoogleChrome/simplehttp2server

// $$$$$$$ -
https://blog.risingstack.com/writing-a-javascript-framework-project-structuring/
// USE BROWSERSTACK
// https://www.browserstack.com/screenshots/46a766e4ada9f5ad93a40e085769c68432601026

// https://github.com/w3c/webcomponents/issues/509#issuecomment-230700060

SNUGGSI

Javascript optimizations (Developer Ergonomics)
https://leftshift.io/4-javascript-optimisations-you-should-know

Hidden Classes & Inline Caching
http://richardartoul.github.io/jekyll/update/2015/04/26/hidden-classes.html
https://github.com/sq/JSIL/wiki/Optimizing-dynamic-JavaScript-with-inline-caches

Type Coercion
String([‘foo’, ‘bar’])
[‘foo’] + ‘'
[].concat

TRAILING SLASH
https://github.com/pyeve/eve/issues/118#issuecomment-373893759
https://tools.ietf.org/html/rfc3986#section-3.3
https://groups.google.com/forum/#!topic/api-craft/L2YlSS7FmEk
- https://github.com/pedestal/pedestal/pull/352

CONDITIONAL (IF) vs Expressions. https://fsharpforfunandprofit.com/posts/expressions-vs-statements/


DON’T CONCATENATE SCRIPTS! - https://github.com/comfusion/hyperdrive/issues/83
Lightening Talks
YOUTUBE COPYRIGHT FAIR USE
Copyright Disclaimer Under Section 107 of the Copyright Act 1976, allowance is made for "fair use" for purposes such as criticism, comment, news reporting, teaching, scholarship, and research. Fair use is a use permitted by copyright statute that might otherwise be infringing. Non-profit, educational or personal use tips the balance in favor of fair use

WEB PLATFORM STATUS - https://platformstatus.io/

https://www.chromestatus.com/features
https://developer.microsoft.com/en-us/microsoft-edge/platform/status/
https://platform-status.mozilla.org/#request-idle-callback
https://webkit.org/status/
The Critical Request - https://css-tricks.com/the-critical-request/#article-header-id-6
Position Sticky -
https://developer.mozilla.org/en-US/docs/Web/CSS/position#Sticky_positioning
https://developer.microsoft.com/en-us/microsoft-edge/platform/status/positionsticky/
In browser transpilation.
https://developer.mozilla.org/en-US/docs/Web/API/HTMLScriptElement

HTML
HTML5 Elements - https://simon.html5.org/html-elements
Mathematical Programming Contexts.
<var> - https://developer.mozilla.org/en-US/docs/Web/HTML/Element/var
<samp> - https://developer.mozilla.org/en-US/docs/Web/HTML/Element/samp
Removal of <head> <html> <body>
https://forums.adobe.com/thread/2051531
http://stackoverflow.com/questions/5641997/is-it-necessary-to-write-head-body-and-html-tags
HTTP <Link> The One Header Every CSS Author Should Learn
https://www.w3.org/TR/html4/present/styles.html#h-14.6
https://www.w3.org/wiki/LinkHeader
No IE Support
https://meyerweb.com/eric/thoughts/2009/01/22/using-http-headers-to-serve-styles/
<meta> tag - https://html.spec.whatwg.org/multipage/semantics.html#the-meta-element
<slot>
Transparent content https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Transparent_content_model
Sections and outlines 
- https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML_sections_and_outlines



H/2 (HTTP 2)
Server strategy https://support.cloudflare.com/hc/en-us/articles/218367338-HTTP-2-Server-Push
https://hpbn.co/http2/
Pagination with HTTP <link> - https://developer.github.com/v3/guides/traversing-with-pagination/
Prefetch, Preload Resources with <link>
<link rel=preload> https://w3c.github.io/preload/
https://codepen.io/tigt/post/async-css-without-javascript
https://developer.mozilla.org/en-US/docs/Web/HTTP/Link_prefetching_FAQ
https://github.com/Fyrd/caniuse/issues/2130#issuecomment-189755682
https://fetch.spec.whatwg.org/#concept-request-destination
Server Push
Preload https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for/
https://www.smashingmagazine.com/2017/04/guide-http2-server-push/
Protocol Agnostic - //
Destroy all IFs - http://degoes.net/articles/destroy-all-ifs
Brotli compression
https://github.com/devpunks/snuggsi/tree/master/dist#brotli-compression-minbr
GZIP Compression
https://github.com/devpunks/snuggsi/tree/master/dist#gzip-compression-mingz
.es application/ecmascript extension
https://tools.ietf.org/html/rfc4329#section-8.2
Font Loading
https://tabatkins.github.io/specs/css-font-display/
FontFace API 
Oh the irony not supported in IE (they made @font-face)
https://www.igvita.com/2014/01/31/optimizing-web-font-rendering-performance/https://gist.github.com/paulirish/d511793a1c3b74b31460
http://caniuse.com/#feat=font-loading
https://drafts.csswg.org/css-font-loading/
 https://developer.mozilla.org/en-US/docs/Web/API/FontFace


 application/ecmascript (.es) file extension - https://tools.ietf.org/html/rfc4329#section-8.2

 Responsive images https://dev.opera.com/articles/responsive-images/
 Page visibility API 
 https://www.html5rocks.com/en/tutorials/pagevisibility/intro/
  https://www.w3.org/TR/page-visibility/#sec-document-interface
  Responsive typography. https://twitter.com/sarah_edo/status/856543697462325248
  Battery API - https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API
  Link in body
  https://jakearchibald.com/2016/link-in-body/
  https://www.w3.org/Bugs/Public/show_bug.cgi?id=27303
  https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/ZAPP8aTnyn0
  https://github.com/whatwg/html/commit/179983e9eb99efe417349a40ebb664bd11668ddd
  Intersection Observer
  https://platform-status.mozilla.org/#intersection-observer

  CSS Snappoints (OH SNAP!)
    https://blog.hospodarets.com/css-scroll-snap
    https://www.w3.org/TR/css-scroll-snap-1/
    https://drafts.csswg.org/css-scroll-snap/
    http://caniuse.com/#feat=css-snappoints
    https://css-tricks.com/introducing-css-scroll-snap-points/
  https://github.com/ckrack/scrollsnap-polyfill

  The Template - Reach out to TJ https://twitter.com/Rich_Harris/status/849746116514115584
  Hanami - http://hanamirb.org/blog/2017/04/06/announcing-hanami-100.html
  CSS Grids
   https://alistapart.com/article/practical-grid
   https://webkit.org/status/#specification-css-grid-layout-level-1
   https://developer.microsoft.com/en-us/microsoft-edge/platform/status/cssgridlayout/
   Benchmarking - http://localhost:8181/examples/infinity-calendar.html
   Tom Ethernet Packet 
   - https://en.wikipedia.org/wiki/Ethernet_frame#Structure
   https://en.wikipedia.org/wiki/Maximum_transmission_unit
   Progressive Web Apps 
   - https://medium.com/javascript-scene/native-apps-are-doomed-ac397148a2c0
   https://medium.com/javascript-scene/why-native-apps-really-are-doomed-native-apps-are-doomed-pt-2-e035b43170e9
   Chrome timeline GIF - https://blog.hospodarets.com/chrome-timeline-to-gif
   ECMAScript modules in the browser
   Don’t Bundle Your Modules 
   https://dl.dropboxusercontent.com/u/20140634/script-type-module/images/asyncdefer.svg
   https://github.com/whatwg/html/pull/443 
   https://github.com/whatwg/loader/issues/83#issuecomment-166442597
   https://blogs.windows.com/msedgedev/2016/05/17/es6-modules-and-beyond/#RPFVZO0LoQM5QwHT.97
   https://blog.hospodarets.com/native-ecmascript-modules-new-features
   https://github.com/whatwg/html/pull/2261
   https://html.spec.whatwg.org/multipage/scripting.html#attr-script-nomodule
   https://trac.webkit.org/changeset/211078/webkit
   https://blog.hospodarets.com/native-ecmascript-modules-the-first-overview
   https://github.com/w3c/web-platform-tests/pull/4611
   "smoke server" https://zeit.co/docs
   Understanding Scope curly braces.
   Multi line edit in console. WOWWWW
   X-Content-Type-Options: nosniff
   NoSniff - http://bugs.chromium.org/p/chromium/issues/detail?id=180007
   Event target comparisons - https://developer.mozilla.org/en-US/docs/Web/API/Event/Comparison_of_Event_Targets
   Destructuring - http://www.datchley.name/es6-rest-spread-defaults-and-destructuring/
   Visibility Change.
   https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
   https://developer.mozilla.org/en-US/docs/Web/Events/visibilitychange
   Thunks - http://stackoverflow.com/questions/18710177/what-is-the-difference-between-thunk-futures-and-promises
   ES6 Function.name - https://leanpub.com/understandinges6/read#leanpub-auto-ecmascript-6s-name-property
   Styling form controls
   https://trac.webkit.org/wiki/Styling%20Form%20Controls#Dateinputtype
   Understanding code through personal financial budgeting. https://medium.com/p/8c63eac62db5/edit
   API Versioning
   https://gist.github.com/vamsipavanmahesh/c8d7d4ed33caf8c19bb4feecbc0908b8
   CSS @import
   https://discourse.wicg.io/t/is-css-import-still-considered-as-an-anti-pattern/1967/2
   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
   https://github.com/TrySound/postcss-easy-import
   CSS Variables 
   https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables
   Pure CSS Tabs
   ES File Extension

   Fetch
   Headers, Request, Response
   Form Data -
   Before - https://gist.github.com/9e8d3017f4f7eb12261a4aa8713cf967
   After - https://developer.mozilla.org/en-US/docs/Web/API/FormData
   Leading Forward Slash
   http://stackoverflow.com/questions/4659345/is-there-any-downside-for-using-a-leading-double-slash-to-inherit-the-protocol-i
   Difference between the W3C and WHATWG
   https://ww      w.reddit.com/r/javascript/comments/5swe9b/what_is_the_difference_between_the_w3c_and_the/
   https://developer.mozilla.org/en-US/docs/Web/HTML/Element/output
   change / output
    https://developer.mozilla.org/en-US/docs/Web/Events/change
    https://developer.mozilla.org/en-US/docs/Web/HTML/Element/output
    dataset / datalist
    https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist
    https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
    void operator https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void
    Main https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main
    The global object -
    http://www.2ality.com/2015/02/es6-scoping.html#the_global_object
    http://stackoverflow.com/questions/30321636/es6-classes-what-about-instrospection/30322216#30322216
    Menu - http://stackoverflow.com/questions/4969801/nav-or-menu-html5
    Headers (Default in Section/Article sized smaller)
    http://stackoverflow.com/questions/26290849/why-is-size-of-h1-different-inside-a-section-element
    https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML_sections_and_outlines
    CSS « Any » https://developer.mozilla.org/en-US/docs/Web/CSS/:any
    CSS Collapsing header 
    https://chrisbracco.com/simple-css3-collapsing-header-effect/#comment-3168265901
    Branch Protection
    - https://github.com/NYCrb/devpunks/settings/branches
    Why Symbols over WeakMaps (i.e. this [Symbol.species] 
    http://webreflection.blogspot.com/2013/03/simulating-es6-symbols-in-es5.html
    Autosquash - https://coderwall.com/p/hh-4ea/git-rebase-autosquash
    Regular Expressions:
    Non Capturing - http://stackoverflow.com/questions/3512471/what-is-a-non-capturing-group-what-does-a-question-mark-followed-by-a-colon
    Cosole 
    https://developer.mozilla.org/en-US/docs/Web/API/Console/table
    Clone Node https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode
    Merging objects Object.assign https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Merging_objects
    Can drag elements in developer console.
    Can use $0= as current context
    Destructing https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    hidden https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden
    rotating screens
    Default is portrait then media query for landscape
    Page Visibility API - https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
    @media only screen and (orientation: portrait)
    <dialog>::backdrop
    https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
    Counters 
    https://davidwalsh.name/css-counters
    https://www.youtube.com/watch?v=Snj31cMmZ2c
    https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Lists_and_Counters/Using_CSS_counters
    will-change -
     https://developer.mozilla.org/en-US/docs/Web/CSS/will-change
     http://cssmojo.com/the-dark-side-of-the-will-change-property/
     https://dev.opera.com/articles/css-will-change-property/
      https://www.youtube.com/watch?v=GB4p-W8Qsjs
      https://css-tricks.com/prefetching-preloading-prebrowsing/
      Link Prefetching - https://developer.mozilla.org/en-US/docs/Web/HTTP/Link_prefetching_FAQ
      preconnect, prefetch, preload, prerender https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types
      Link HTML Imports.
      Link - preload - https://w3c.github.io/preload/
      Stop white flicker from stylesheets waiting. (PRELOAD!!!)

      WebRTC
      Call systems
      The Call - https://en.wikipedia.org/wiki/Telephone_call
      « Etiquette protocol"
