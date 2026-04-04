import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/es/storage";
import { authReducer } from "../../features/auth/model/slice";
import { combineReducers } from "@reduxjs/toolkit";

const userPersistConfig = {
  key: "store:users",
  storage,
  whiteList: ["user"],
};

const rootReducer = combineReducers({
  auth: persistReducer(userPersistConfig, authReducer),
});

export default rootReducer;
