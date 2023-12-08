import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./employeeSlice";
import authReducer from "./authSlice";
import studentReducer from "./studentSlice";
import universityReducer from "./universitySlice";
import diplomaReducer from "./diplomaSlice";
import directorReducer from "./directorSlice";

const store = configureStore({
  reducer: {
    employees: employeeReducer,
    auth: authReducer,
    students: studentReducer,
    universities: universityReducer,
    diplomas: diplomaReducer,
    directors: directorReducer,

    // Add other reducers as needed
  },
});

export default store;
