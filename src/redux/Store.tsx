import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./slices/TasksSlice";
import authReducer from "./slices/AuthSlice";
import passwordChangeReducer from "./slices/passwordChangeSlice";

const store = configureStore({
  reducer: {
    tasks: taskReducer,
     auth: authReducer,
     passwordChange: passwordChangeReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;