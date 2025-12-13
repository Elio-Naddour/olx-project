import { configureStore } from "@reduxjs/toolkit";
import { olxApi } from "./api/olxApi";
import categoryReducer from "./slices/categorySlice";

export function makeStore() {
  return configureStore({
    reducer: {
      [olxApi.reducerPath]: olxApi.reducer,
      category: categoryReducer,
    },
    middleware: (gDM) => gDM().concat(olxApi.middleware),
    devTools: process.env.NODE_ENV !== "production",
  });
}

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
