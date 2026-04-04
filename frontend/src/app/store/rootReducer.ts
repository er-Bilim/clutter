import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/es/storage";
import { authReducer } from "../../features/auth/model/slice";
import { combineReducers } from "@reduxjs/toolkit";
import { productReducer } from "../../entities/product/model/slice";
import { categoryReducer } from "../../entities/category/model/slice";

const userPersistConfig = {
  key: "store:users",
  storage,
  whiteList: ["user"],
};

const rootReducer = combineReducers({
  auth: persistReducer(userPersistConfig, authReducer),
  product: productReducer,
  category: categoryReducer,
});

export default rootReducer;
