//This file creates a custom pre-typed hook that can we used in any component  (REDUX) //

import { useDispatch, useSelector, useStore } from "react-redux";
import { AppDispatch, AppStore, RootState } from "./store";

// This removes the problem of typing (state : RootState) => {...} in every component you will use the useSelector in the component //

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<AppStore>();

