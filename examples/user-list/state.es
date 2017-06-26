const
  userActions = rxr.createMessageStreams([ 'userClick' ])

, userClickReducer = userActions.userClick$
    .map(value => state => {
      let
        users = [{'name': 'rob'}, {'name': 'dan'}]

      return Object.assign({}, state, {users: users})
    })

// Initial component state
, initialState = { users: [] }
, stateSelector = (state) =>
    ({
      users: state.users,
    })

// Creates a store context object that can be injected
// into a reactive element.
, createStore = (initialState, reducer, selector) =>
  ({
    initialState: initialState,
    state$: rxr.createState(reducer, initialState),
    selector: selector
  })

, userStore = createStore(initialState, 
    userClickReducer, stateSelector)
