import React from 'react';
import { createStore } from './createStore';

/**
 * 脱离react的store
 */
const store = createStore({
  username: '',
  password: '',
  age: 0,
  count: 0,
});

export const AppContext = React.createContext<StoreValues>(store.getState());

export type StoreValues = ReturnType<typeof store.getState>;

export default store;
