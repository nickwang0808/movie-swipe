import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./redux";

export const store = configureStore({
  reducer: rootReducer,
});

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./redux", () => {
    const newRootReducer = require("./redux").default;
    store.replaceReducer(newRootReducer);
  });
}

export type IAppState = ReturnType<typeof store.getState>;

export type IAppDispatch = typeof store.dispatch;
