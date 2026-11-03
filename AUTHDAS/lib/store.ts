import { configureStore } from "@reduxjs/toolkit"
import showPassSliceReducer from "../lib/features/uiSlice/uiSlice"

//get the type what the makestore function returns
export type AppStore = ReturnType<typeof makeStore>

export type RootState = ReturnType<AppStore['getState']>

export type AppDispatch = AppStore['dispatch'];

// this is the root store  configuration.
// it creates the Redux store 
export const makeStore = () => {
  return configureStore({
    reducer: {    //  This tells redux toolkit to build the root reducer from that slice reducer ui.
      ui: showPassSliceReducer,
      
    },
  })
}