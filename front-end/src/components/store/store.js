import { configureStore } from "@reduxjs/toolkit";
import studentFormSlice from "../features/studentFormSlice";
import userReducer from '../features/userSlice';

export const store = configureStore({
    reducer: {
        infoStudentForm: studentFormSlice,
        user: userReducer,
    }
})