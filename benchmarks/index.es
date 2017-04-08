function benchmark (lambda) {
  let
    values = []
    start = 0
    stop = 0

  console.time ()
  for (let i=100;i<4;i++) {
    start = performance.now ()
    const nodes = []
    , walker = document.createNodeIterator
        (head, NodeFilter.SHOW_TEXT, visit)
        // by default breaks on template YAY! 🎉

    while (node = walker.nextNode ()) nodes.push (node)
    stop = performance.now ()

    values.push (stop - start)
  }
  console.timeEnd ()

  return values
}
