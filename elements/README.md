# Interfaces

## Element

Enhancements to `Element` interface

## GlobalEventHandlers

Enhancements to `HTMLLinkElement` interface


### Registration
  - `on*` events

### Lifecycle
  - initialize - context, events?
  - render - Event driven reflow / repaint (called every frame)

  - onconnect -> `Element` is now ready for usage
  - onidle    -> After render frame callback

## HTMLLinkElement

Enhancements to `HTMLLinkElement` interface

## HTMLParentNode

Enhancements to `HTMLParentElement` interface

## HTMLTemplateElement

### .content

This is a `DocumentFragment` returned of the `<template>` content.

## TokenList

Used to hold placeholders within markup. (i.e. `<p> Hello {first_name}</p>`


# Testing

  - Introduction - http://web-platform-tests.org/introduction.html
  - [TAP Testing Protocol](https://testanything.org)
  - Writing Tests - http://web-platform-tests.org/writing-tests
  - Test Authoring - https://www.w3.org/html/wg/wiki/Testing/Authoring
  - Web Platform - https://platform.html5.org
  - JSDOM - https://github.com/tmpvar/jsdom
  - [w3c/web-platform-tests/custom-elements](https://github.com/w3c/web-platform-tests/tree/master/custom-elements)
  - [Testem: Tape Example](https://github.com/testem/testem/tree/master/examples/tape_example)
  - [Testem: Continuous Integration Mode](https://github.com/testem/testem#continuous-integration-mode)
  - [TreeHouse: Javascript sandboxes to help Web developers help themselves](https://pdfs.semanticscholar.org/47f0/6bb6607a975500a30e9e52d7c9fbc0034e27.pdf)


## Tutorials

  - [HTML Testing by James Graham](http://hoppipolla.co.uk/talks/testing/testing.html)
  - [using-testharness.js by Robin Berjon](http://darobin.github.com/test-harness-tutorial/docs/using-testharness.html)
  - [Test The Web Forward Seattle by Kris Krueger](http://www.w3.org/html/wg/wiki/images/b/b6/Testharness.pdf)

## Process for contributing to W3C (Web Platform Tests)

  The process for submission and approval of tests is currently:

  - Write tests
  - [Submit the tests to the working group](https://www.w3.org/html/wg/wiki/Testing/Submission)
  - Wait for the tests to be reviewed

