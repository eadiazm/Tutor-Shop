import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

const initialState = {
    isTutor: false,
    isStudent: false,
    studentId: null,
    tutorId: null,
    userId: null,
    userName: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            const decodedToken = jwtDecode(action.payload.token);  // Utilizar jwt_decode
            localStorage.setItem('token', action.payload.token);  // Guardar el token directamente

            state.isTutor = decodedToken.roles.isTutor || false;  // Ajuste para roles como array
            state.isStudent = decodedToken.roles.isStudent || false;  // Ajuste para roles como array
            state.studentId = decodedToken.studentId || null;
            state.tutorId = decodedToken.tutorId || null;
            state.userId = decodedToken.user.id;
            state.userName = decodedToken.user.username;

            localStorage.setItem('user', JSON.stringify(state));  // Guardar el usario directamente
        },
        logout: (state) => {
            state.isTutor = false;
            state.isStudent = false;
            state.studentId = null;
            state.tutorId = null;
            state.userId = null;
            state.userName = null;
            localStorage.removeItem('token');  // Eliminar el token en lugar del 'user'
            localStorage.removeItem('user');  // Guardar el usario directamente
        },
        setUser: (state, action) => {
            // Esta función puede ser utilizada si quieres setear información del usuario manualmente
            state.userId = action.payload.userId;
            state.userName = action.payload.userName;
            state.isTutor = action.payload.isTutor;
            state.isStudent = action.payload.isStudent;
            state.studentId = action.payload.studentId;
            state.tutorId = action.payload.tutorId;
        },
    },
});


export const { login, logout, setUser } = userSlice.actions;
export default userSlice.reducer;
