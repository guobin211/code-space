import React from 'react'
import { createStore } from './createStore'

/**
 * 脱离react的store
 */
const store = createStore({
  appid: '',
  userid: '',
})

export const AppContext = React.createContext<StoreValues>(store.getState())

export type StoreValues = ReturnType<typeof store.getState>

export default store
