const 
  messageStreams = rxr.createMessageStreams([ 'userClick' ])

, userClickReducer$ = messageStreams.userClick$
  .map(value => state => {
    let
      users = [{'name': 'rob'}, {'name': 'dan'}]

    return (state.action == 0)
      ? Object.assign({}, state, {users: users})
      : Object.assign({}, state, {users: users})
  })

, initialState = {users: []}

, state$ = rxr.createState(userClickReducer$, initialState)

, stateSelector = (state) =>
    ({
      users: state.users,
    })


const Reactive = (Element) => 

(class extends Element {
  // onidle fires after onconnect, with onconnect you haven't
  // rendered yet and are blocking the first paint from happening on the element.
  static onidle () {
    let 
      target = this.constructor.onstatechange

    this.stream =
      state$
      .map(stateSelector)
      .subscribe(target.bind(this))
  }
})
