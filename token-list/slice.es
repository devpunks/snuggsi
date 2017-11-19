function slice (text) {
  const
    tokens = []

    // stored regex is faster https://jsperf.com/regexp-indexof-perf
  , sections =
      text
        .replace (/({\w+})/g,
          (token => tokens.push (token) && '✂️'))
        .split ('✂️')

  return zip (tokens, sections)
        .map (element => element && new Text (element))
}
