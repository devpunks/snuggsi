# `ParentNode`

  Interface used for parent -> child node relationships.

  - [Read More on MDN](https://developer.mozilla.org/en-US/docs/Web/API/ParentNode)


## `.select (selector)`

## `.selectAll (selector)`


https://dom.spec.whatwg.org/#interface-parentnode

To convert nodes into a node, given nodes and document, run these steps:

  1. Let node be null.

  2. Replace each string in nodes with a new Text node whose data is the string and node document is document.

  3. If nodes contains one node, set node to that node.

  4. Otherwise, set node to a new DocumentFragment whose node document is document, and then append each node in nodes, if any, to it.

  5. Return node.
