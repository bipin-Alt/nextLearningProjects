import { configureStore } from "@reduxjs/toolkit"
import showPassSliceReducer from "../lib/features/uiSlice/uiSlice"

// this is the root store  configuration.
// it creates the Redux store 
export const makeStore = () => {
  return configureStore({
    reducer: {    //  This tells redux toolkit to build the root reducer from that slice reducer ui.
      ui: showPassSliceReducer,
    },
  })
}