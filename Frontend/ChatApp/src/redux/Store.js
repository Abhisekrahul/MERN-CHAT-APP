import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/UserSlice";
import messageReducer from "../redux/messageSlice";
import socketReducer from "../redux/socketSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    message: messageReducer,
    socket: socketReducer,
  },
});

export default store;
