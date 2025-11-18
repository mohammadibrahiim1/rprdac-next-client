import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/authApi";
import { baseApi } from "../services/baseApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch;
