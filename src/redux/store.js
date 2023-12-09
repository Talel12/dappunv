import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./employeeSlice";
import authReducer from "./authSlice";
import studentReducer from "./studentSlice";
import universityReducer from "./universitySlice";
import diplomaReducer from "./diplomaSlice";
import directorReducer from "./directorSlice";
import offresReducer from "./offreSlice";

const store = configureStore({
  reducer: {
    employees: employeeReducer,
    auth: authReducer,
    students: studentReducer,
    universities: universityReducer,
    diplomas: diplomaReducer,
    directors: directorReducer,
    offres: offresReducer,
    // Add other reducers as needed
  },
});

export default store;
