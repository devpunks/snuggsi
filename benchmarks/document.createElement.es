console.time()

const plot = new Array

for (let i = 0; i < 100; i++) {
  const start = new Date
  for (let i = 0; i < 1000; i++) {
      document.body.append (document.createElement ('infinity-calendar'))
  }
  console.log ((new Date).getTime() - start.getTime())
  plot.push ((new Date).getTime() - start.getTime())
}
console.timeEnd()

console.log (plot.join ('\n'))
