/*
  HTMLElement mixin which provides abstractions
  over the RxJS conventions through context state.

  State changes from the injected state$ stream will call
  onstatechange.
*/

const
  userActions = rxr.createMessageStreams ([ 'userClick' ])

, assign = value => state => {
    let
      users = [{'name': 'rob'}, {'name': 'dan'}]

    return Object.assign({}, state, {users: users})
  }

, userClickReducer = userActions
    .userClick$
    .map (assign)

const Reactive = (Element) =>

class extends Element {

  get store () {
    let state = { users: [] }

    return {
      initialState: state,
      selector: (state) => ({ users: state.users }),
      state$: rxr.createState (userClickReducer, state)
    }
  }

  initialize () {

    console.log ('initializing')

    if(!this.store.state$)
      throw new Error(
        'Reactive expected the `state$` property on store.'
      )

    this.state$ = this.store.state$

    this.selector = this.store.selector
      ? this.store.selector : (state) => (state)

    this.state = this.store.initialState
      ? this.store.initialState : {}
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

}
