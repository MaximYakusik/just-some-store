const { createStore } = require('../dist/index.min.js');

const { store, action, initState } = createStore();

initState({
  first: 0,
  second: 0,
  last: 0,
});

const setFirst = action((state, first) => ({
  ...state,
  first,
}));

const setSecond = action((state, second) => ({
  ...state,
  second,
}));

const setLast = action((state, last) => ({
  ...state,
  last,
}));

function bench() {
  let count = 0;

  function listener() {
    count++;
  }

  store.subscribe(listener);

  for (let i = 0; i < 100; i++) {
    const state = store.getState();
    store.dispatch(setFirst(state.first + 1));
    store.dispatch(setSecond(state.second + 1));
    store.dispatch(setLast(state.last + 1));
  }

  store.unsubscribe(listener);

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
