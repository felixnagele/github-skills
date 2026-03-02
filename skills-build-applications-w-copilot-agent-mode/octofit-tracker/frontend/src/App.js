import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Activities from "./components/Activities";
import Leaderboard from "./components/Leaderboard";
import Teams from "./components/Teams";
import Users from "./components/Users";
import Workouts from "./components/Workouts";

function App() {
  return (
    <div className="app-shell py-4">
      <div className="container">
        <div className="card app-header-card shadow-sm mb-4">
          <div className="card-body d-flex align-items-center gap-3">
            <img
              src="/octofitapp-small.png"
              alt="OctoFit logo"
              className="app-logo"
            />
            <div>
              <h1 className="display-6 mb-1 app-title">OctoFit Tracker</h1>
              <p className="mb-0 app-subtitle">
                React dashboard connected to the Django REST API
              </p>
            </div>
          </div>
        </div>

        <nav className="navbar navbar-expand-lg bg-body-tertiary rounded-3 px-3 mb-4">
          <span className="navbar-brand fw-semibold mb-0 h1">Navigation</span>
          <ul className="navbar-nav flex-wrap gap-1">
            <li className="nav-item">
              <NavLink className="nav-link" to="/activities">
                Activities
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/leaderboard">
                Leaderboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/teams">
                Teams
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/users">
                Users
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/workouts">
                Workouts
              </NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/activities" replace />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
