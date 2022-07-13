# just-some-store

## Install

```
$ yarn add just-some-store
```

## Usage

```js
import { createStore } from 'just-some-store';

// initialize store
const { store, initState, action } = createStore();

const initialState = {
  some: 'value',
  other: 'value',
};

initState(initialState);

const setSome = action((state, some) => {
  return {
    ...state,
    some,
  };
});

const setOther = action((state, other) => {
  return {
    ...state,
    other,
  };
});

// usage

// will call listener each time when calling dispatch for single or multiple action
const listener = state => {
  /* do samting with state */
};
store.subscribe(listener);

// dispatch one action
store.dispatch(setSome('newSomeValue'));

// will return { some: 'newSomeValue', other: 'value' }
store.getState();

// dispatch multiple action
store.dispatch([setSome('newSomeAnotherValue'), setOther('newOtherValue')]);

// will reture { some: 'newSomeAnotherValue', other: 'newOtherValue' }
store.getState();

store.unsubscribe(listener);
```
