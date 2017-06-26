/*
  HTMLElement mixin which provides abstractions
  over the RxJS conventions through mediating the context of state.

  State changes from the injected state$ stream will call
  onstatechange.
*/

const

  // Creates a store context object that can be injected
  // into a reactive element.
  createStore = (initialState, reducer, selector) => 
    ({
      initialState: initialState,
      state$: rxr.createState(reducer, initialState),
      selector: selector
    })

  // Element - HTMLElement to extend
  // store - store context object
, Reactive = ( Element, store) =>

(class extends Element {
  initialize () { 
    if(!store.state$)
      throw new Error(
        'Reactive expected the `state$` property on store.'
      )

    this.state$ = store.state$

    this.selector = store.selector 
      ? store.selector : (state) => (state)

    this.state = store.initialState
      ? store.initialState : {}
  }

  // configure streams within onidle, 
  // avoids blocking the first paint.
  static onconnect () {
    let 
      target = this.constructor.onstatechange

    this.stream =
      this.state$
      // immutable conventions allow for 
      // standard comparison operator.
      .distinctUntilChanged((x, y) => (x == y))
      // reduce state into selected scope
      .map(this.selector)
      .subscribe(target.bind(this))
  }

  // receives state updates
  static onstatechange (state) { return }

})
