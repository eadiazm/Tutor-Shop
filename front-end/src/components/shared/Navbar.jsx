import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export function Navbar() {
  const user = useSelector((state) => state.user);

  return (
    <div className="container-fluid" style={{ padding: 0 }}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand" href="/">
            TutorShop
          </a>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              {user.userId && user.isTutor && (
                <>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdownTutor"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Tutores
                    </a>
                    <ul
                      className="dropdown-menu dropdown-menu-dark"
                      aria-labelledby="navbarDropdownTutor"
                    >
                      <li>
                        <Link className="dropdown-item" to="/tutor/dashboard">
                          Dashboard
                        </Link>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              {user.userId && user.isStudent && (
                <>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdownStudent"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Estudiante
                    </a>
                    <ul
                      className="dropdown-menu dropdown-menu-dark"
                      aria-labelledby="navbarDropdownStudent"
                    >
                      <li>
                        <Link className="dropdown-item" to="/student/dashboardstudent">
                          Dashboard
                        </Link>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              {user.userId && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/logout">
                      Logout
                    </Link>
                  </li>
                </>
              )}
              {!user.userId && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/tutor/registration">
                      Quiero ser tutor
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/student/registration1">
                      Quiero ser estudiante
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav >
    </div >
  );
}
