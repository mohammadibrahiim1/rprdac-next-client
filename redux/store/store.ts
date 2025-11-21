import { configureStore } from "@reduxjs/toolkit";
// import { authApi } from "../services/authApi";
import { baseApi } from "../services/baseApi";
import authReducer from "../features/auth/authSlice";
import mailReducer from "../features/mail/mailSlice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
    mail: mailReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch;
