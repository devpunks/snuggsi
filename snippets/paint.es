let
  load  = chrome.loadTimes ()
  , paint = load.firstPaintTime - load.startLoadTime

  console.warn
    (`First Paint Time ${paint.toFixed (3)} ms`)
