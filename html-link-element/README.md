# `HTMLLinkElement`

The HTML `<link>` element specifies relationships between the current document and an external resource. Possible uses for this element include defining a relational framework for navigation. This element is most used to link to style sheets.

  - [W3C The `link` Element](https://www.w3.org/TR/html5/document-metadata.html#the-link-element)
  - [Read More on MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLinkElement)


## Resource Hints

  - Resource Hints - https://www.w3.org/TR/resource-hints


### Import _(deprecated)_

  - http://w3c.github.io/webcomponents/spec/imports/#h-interface-import
  - https://github.com/w3c/webcomponents/blob/gh-pages/proposals/HTML-Imports-and-ES-Modules.md


### Preload

  Preload, Prefetch And Priorities in Chrome

  https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf

  - WHATWG Obtaining a link element - https://w3c.github.io/html/document-metadata.html#obtain
  - W3C Preload https://github.com/w3c/preload
  - W3C Preload https://github.com/w3c/preload/issues/92
  - W3C Preload Tests - https://w3c-test.org/preload
  - WPT Preload Tests - https://github.com/w3c/web-platform-tests/tree/master/preload
  - https://github.com/w3ctag/design-reviews/issues/202
  - Fetch preload, destinations, and module scripts - https://github.com/whatwg/fetch/issues/486
  - Preload. What is it good for? https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for
  - Big Bad Preloader - http://calendar.perfplanet.com/2013/big-bad-preloader
  - https://developer.microsoft.com/en-us/microsoft-edge/platform/status/preload/
  - Preloading - https://w3c.github.io/preload
  - Preload _"Polyfill"_
    - Core   - https://gist.github.com/aFarkas/34dde117000ec7075053#file-preload-core-js
    - Script - https://gist.github.com/aFarkas/34dde117000ec7075053#file-preload-as-script-js
    - Style  - https://gist.github.com/aFarkas/34dde117000ec7075053#file-preload-as-style-js

#### Preload Use Cases

  https://w3c.github.io/preload/#use-cases

#### Bugs

  - Firefox - https://bugzilla.mozilla.org/show_bug.cgi?id=1405761


### Prefetch

  - IE11 Support for Prerender / Prefetch - https://msdn.microsoft.com/en-us/library/dn265039(v=vs.85).aspx


### Prerender

  - IE11 Support for Prerender / Prefetch - https://msdn.microsoft.com/en-us/library/dn265039(v=vs.85).aspx




## Onload

  Why `GlobalEventHandlers.onload`?

  - Queue - https://bugs.webkit.org/show_bug.cgi?id=38995#c26
  - TEST - http://www.phpied.com/files/cssonload/test.html
  - Comment from the past - https://bugs.webkit.org/show_bug.cgi?id=38995#c15

  - https://trac.webkit.org/browser/webkit/trunk/Source/WebCore/loader/LinkLoader.cpp
  - https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onload
  - https://dom.spec.whatwg.org/#concept-event-fire
  - $$$$ loading capabilities - https://pie.gd/test/script-link-events/
  - $$$$ when is a stylesheet really loaded? https://www.phpied.com/when-is-a-stylesheet-really-loaded/
  - https://stackoverflow.com/questions/4488567/is-there-any-way-to-detect-when-a-css-file-has-been-fully-loaded


## MutationObserver

  - https://dom.spec.whatwg.org/#mutation-observers
  - https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver


## Implementation Tickets

  - Link rel preload as attribute doesn't support document value - https://bugs.chromium.org/p/chromium/issues/detail?id=593267
  - Implement load event for `link` element - https://bugs.chromium.org/p/chromium/issues/detail?id=67522
  - https://bugzilla.mozilla.org/show_bug.cgi?id=185236
  - Load CSS - https://github.com/filamentgroup/loadCSS/blob/master/src/loadCSS.js
  - CSS Preload - https://github.com/filamentgroup/loadCSS/blob/master/src/cssrelpreload.js
  - https://bugs.webkit.org/show_bug.cgi?id=3652
  - https://jakearchibald.com/2017/h2-push-tougher-than-i-thought/#push-vs-preload
  - https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/12142852/
  - Caching best practices - https://jakearchibald.com/2016/caching-best-practices/
  - $$$$$$ HOT SWAP URL BASE PATHS! https://eager.io/blog/three-real-world-use-cases-for-mutation-observer

  - https://github.com/whatwg/html/commit/179983e9eb99efe417349a40ebb664bd11668ddd
  - https://bugs.webkit.org/show_bug.cgi?id=172639
  - https://github.com/whatwg/html/pull/616#issuecomment-180018260
