const { createStore } = require('redux');

const initialState = { first: 0, second: 0, last: 0 };

function counterReducer(state = initialState, action) {
  const value = action.value;
  switch (action.type) {
    case 'setFirst':
      return { ...state, first: value };
    case 'setSecond':
      return { ...state, second: value };
    case 'setLast':
      return { ...state, last: value };
    default:
      return state;
  }
}

const store = createStore(counterReducer);

const setFirst = value => ({ type: 'setFirst', value });
const setSecond = value => ({ type: 'setSecond', value });
const setLast = value => ({ type: 'setLast', value });

function bench() {
  let count = 0;

  function listener() {
    count++;
  }

  const unsubscribe = store.subscribe(listener);

  for (let i = 0; i < 100; i++) {
    const state = store.getState();
    store.dispatch(setFirst(state.first + 1));
    store.dispatch(setSecond(state.second + 1));
    store.dispatch(setLast(state.last + 1));
  }

  unsubscribe();

  const state = store.getState();

  return count + state.first + state.second + state.last;
}

module.exports = {
  store,
  setFirst,
  setSecond,
  setLast,
  bench,
};
