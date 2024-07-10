import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./components/shared/Home.jsx";
import { Tutor } from "./components/tutor/Tutor.jsx";
import { Navbar } from "./components/shared/Navbar.jsx";
import { Student } from "./components/student/Student.jsx";

import Footer from "./components/shared/Footer.jsx";

import { Login } from "./components/login/Login.jsx";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "./components/features/userSlice.js";
import ProtectedRoute from './components/shared/ProtectedRoute';
import Logout from "./components/logout/Logout.jsx";
import { TutorRegistrationProvider } from "./components/tutor/TutorRegistrationProvider.jsx";
import { Registration } from "./components/tutor/Registration.jsx";
import { StudentRegistrationProvider } from "./components/student/StudentRegistrationProvider.jsx";
import Registrations from "./components/student/Registrations.jsx";
import Registrations2 from "./components/student/Registrations2.jsx";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      dispatch(setUser(JSON.parse(savedUser)));
    }
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login/*" element={<Login />} />
        <Route path="/logout/*" element={
          <ProtectedRoute>
            <Logout />
          </ProtectedRoute>} />
        <Route path={`/tutor/registration`} element={
          <TutorRegistrationProvider>
            <Registration />
          </TutorRegistrationProvider>} />
        <Route
          path={`/student/registration1`}
          element={
            <StudentRegistrationProvider>
              <Registrations />
            </StudentRegistrationProvider>
          }
        />
        <Route
          path={`/student/registration2`}
          element={
            <StudentRegistrationProvider>
              <Registrations2 />
            </StudentRegistrationProvider>
          }
        />

        <Route
          path="/tutor/*"
          element={
            <ProtectedRoute>
              <Tutor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/*"
          element={
            <ProtectedRoute>
              <Student />
            </ProtectedRoute>
          }
        />

      </Routes>
      <Footer />
    </div>
  );
}

export default App;
