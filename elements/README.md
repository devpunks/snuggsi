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
- Writing Tests - http://web-platform-tests.org/writing-tests
- Web Platform - https://platform.html5.org
- JSDOM - https://github.com/tmpvar/jsdom
- [TreeHouse: Javascript sandboxes to help Web developers help themselves](https://pdfs.semanticscholar.org/47f0/6bb6607a975500a30e9e52d7c9fbc0034e27.pdf)

