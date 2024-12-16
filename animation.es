// https://css-tricks.com/using-requestanimationframe/
// http://creativejs.com/resources/requestanimationframe/
// https://www.html5rocks.com/en/tutorials/speed/animations/
// https://developer.mozilla.org/en-US/docs/Web/API/Element/animate
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Keyframe_Formats
// https://codepen.io/rachelnabors/pen/rxpmJL/?editors=0010
// https://www.webreflection.co.uk/blog/2016/07/31/taming-raf-and-rick
// https://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://blog.teamtreehouse.com/efficient-animations-with-requestanimationframe

// Polyfill - https://github.com/WebReflection/dom4/blob/master/src/dom4.js#L428-L469

var aliceTumbling = [
  { transform: 'rotate(0) translate3D(-50%, -50%, 0', color: '#000' }, 
  { color: '#431236', offset: 0.3},
  { transform: 'rotate(360deg) translate3D(-50%, -50%, 0)', color: '#000' }
];

var aliceTiming = {
  duration: 3000,
  iterations: Infinity
}

document.getElementById("alice")
  .animate( aliceTumbling, aliceTiming)

// https://gist.github.com/paulirish/1579671
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
void (function() {
  let lastTime = 0
  , vendors = ['ms', 'moz', 'webkit', 'o']

  for(let x = 0; x < vendors.length && !!! window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame']
    window.cancelAnimationFrame  = window[vendors[x]+'CancelAnimationFrame']
                                || window[vendors[x]+'CancelRequestAnimationFrame']
  } // for

  void ( 'requestAnimationFrame' in window )
    || window.requestAnimationFrame = function (callback, element) {
      let currTime = new Date().getTime()
      , timeToCall = Math.max(0, 16 - (currTime - lastTime))
      , id = window.setTimeout ( function() { callback(currTime + timeToCall) }, timeToCall )

      lastTime = currTime + timeToCall

      return id;
    } // requestAnimationFrame

  void ( 'cancelAnimationFrame' in window )
    || window.cancelAnimationFrame
      = function(id) { clearTimeout (id) }
}())

// https://gist.github.com/mrdoob/838785
void ( 'requestAnimationFrame' in window )
  || window.requestAnimationFrame = ( function () {
    return window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element )
    { window.setTimeout( callback, 1000 / 60 ) }
})()
