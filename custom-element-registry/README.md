# `CustomElementRegistry`

The CustomElementRegistry interface provides methods for registering custom elements and querying registered elements.

[Read More on MDN](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry)


## The CustomElementRegistry Interface

WHATWG
  - https://html.spec.whatwg.org/multipage/custom-elements.html

HTML Element Constructors
  - https://html.spec.whatwg.org/multipage/dom.html#html-element-constructors

WPT
  - https://github.com/web-platform-tests/wpt/tree/master/custom-elements/custom-element-registry


## The Custom Elements Spec

W3C
  - https://www.w3.org/TR/custom-elements/

WHATWG
  - https://html.spec.whatwg.org/multipage/custom-elements.html


## `CustomElementRegistry.define`

Definition Steps
  - https://html.spec.whatwg.org/multipage/custom-elements.html#concept-custom-element-definition-name#element-definition
  - Classless definition - https://github.com/w3c/webcomponents/issues/587


## `CustomElementRegistry.upgrade`

Upgrade Steps
  - w3c/webcomponents: - https://github.com/w3c/webcomponents/issues/710
  - WHATWG HTML SPEC - https://html.spec.whatwg.org/multipage/custom-elements.html#dom-customelementregistry-upgrade
  - WHATWG - https://github.com/whatwg/html/pull/3535
  - Webkit
    - bug - https://bugs.webkit.org/show_bug.cgi?id=183397
    - Implementation - https://github.com/WebKit/webkit/commit/2ee15a43f1073459c449aac652530a6814587685
  - web-platform-test
    - https://github.com/web-platform-tests/wpt/pull/9869
    - https://github.com/web-platform-tests/wpt/blob/master/custom-elements/custom-element-registry/upgrade.html


## Legacy webcomponentsjs

   - https://github.com/webcomponents/custom-elements/blob/master/src/CustomElementRegistry.js
   - "CEReactions" https://github.com/webcomponents/custom-elements/blob/master/src/CustomElementInternals.js


## CEReactions
   - https://html.spec.whatwg.org/#cereactions
   - https://github.com/webcomponents/custom-elements/pull/62
   - https://html.spec.whatwg.org/multipage/custom-elements.html#cereactions
