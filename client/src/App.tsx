import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LeftNav from "./components/LeftNav";
import PrivateRoute from "./routes/PrivateRoute";
import { useAuth } from "./context/AuthContext";
import Projects from "./pages/Projects";
import Clients from "./pages/Clients";
import Employees from "./pages/Employees";
import Tasks from "./pages/Tasks";

function App() {
  const { user } = useAuth();

  return (
    <div className="flex">
      {user && <LeftNav />}
      <div className="flex-1 bg-app-container bg-orange-100">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/projects"
            element={
              <PrivateRoute>
                <Projects />
              </PrivateRoute>
            }
          />
          <Route
            path="/tasks"
            element={
              <PrivateRoute>
                <Tasks />
              </PrivateRoute>
            }
          />
          <Route
            path="/clients"
            element={
              <PrivateRoute>
                <Clients />
              </PrivateRoute>
            }
          />
          <Route
            path="/employees"
            element={
              <PrivateRoute>
                <Employees />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
