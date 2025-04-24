import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slice/userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { persistStore } from "redux-persist";
import { combineReducers } from "redux";
import thunk from "redux-thunk";

const persistConfig = {
    key:'root',
    storage,
};
const rootReducer = combineReducers({
    user: userReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
});





export default store;
export const persistor = persistStore(store);