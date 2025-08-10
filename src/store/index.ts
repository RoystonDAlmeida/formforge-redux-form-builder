import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import builderReducer from "./builderSlice";
import formsReducer from "./formsSlice";

// Configures the Redux store with the builder and forms reducers.
export const store = configureStore({
  reducer: {
    builder: builderReducer,
    forms: formsReducer,
  },
});

// Defines the root state type based on the store's state.
export type RootState = ReturnType<typeof store.getState>;

// Defines the dispatch type for the store.
export type AppDispatch = typeof store.dispatch;

// A pre-typed dispatch hook that provides type safety for dispatching actions.
export const useAppDispatch: () => AppDispatch = useDispatch;

// A pre-typed selector hook that provides type safety for accessing the state.
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;