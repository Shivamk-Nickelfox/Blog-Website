import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slice/userSlice";
import blogReducer from "./Slice/blogSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "blog"], // Specify which reducers to persist
};
const rootReducer = combineReducers({
  user: userReducer,
  blog: blogReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
export const persistor = persistStore(store);
  