// Snippet tool to determine the actual time taken from load to glass
// https://developers.google.com/web/tools/chrome-devtools/snippets

const
  load  = chrome.loadTimes ()
, paint = load.firstPaintTime - load.startLoadTime

  console.warn
    (`First Paint Time ${paint.toFixed (3)} ms`)
