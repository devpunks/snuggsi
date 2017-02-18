// Remove all children nested within a node
//
// TL;DR; Replace child fastest
//
// BENCHMARK: https://i.stack.imgur.com/5rvfc.png
// https://jsperf.com/innerhtml-vs-removechild/53
// https://developer.mozilla.org/en-US/docs/Web/API/Node#id
// https://developer.mozilla.org/en-US/docs/Web/API/Node#Examples
// WOW!!! elements.children.length=0 faster REALLY?
//   Also remove lastChild is (marginally) faster as well
//
// How is `Element.innerHTML` so gawd dayumn slow?
//   I get it has to creat a `DomParser` but stil
//   https://jsperf.com/empty-an-element
//
// https://jsperf.com/empty-an-element/2
//

console.group ('appendChild')
console.time ('append time')
for (let context of collection) {
  let li = document.createElement ('li')
  ul.appendChild (li)
  li.outerHTML = `<li style='background:red'>Hello ${context.name}!</li>`
}
console.timeEnd ('append time')
console.groupEnd ('appendChild')

