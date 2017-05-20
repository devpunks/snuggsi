# Interfaces

## Element

## GlobalEventHandlers

### Registration
  - `on*` events

### Lifecycle
  - initialize - context, events?
  - render - Event driven reflow / repaint (called every frame)

  - static _on_connected -> `Element` is now ready for usage
  - static _on_idle      -> After render frame callback

## HTMLLinkElement

Enhancements to `HTMLLinkElement` interface

## HTMLParentNode

Enhancements to `HTMLParentElement` interface

## HTMLTemplateElement

### .content

This is a `DocumentFragment` returned of the `<template>` content.

## TokenList

Used to hold placeholders within markup. (i.e. `<p> Hello {first_name}</p>`

