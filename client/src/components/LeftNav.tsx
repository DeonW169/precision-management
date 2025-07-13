import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiGrid, FiFolder, FiUsers, FiUserCheck, FiLogOut, FiFileText } from 'react-icons/fi';

const LeftNav = () => {
  const { logout } = useAuth();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 p-2 rounded hover:bg-base-200 ${
      isActive ? "bg-orange-400 text-white" : ""
    }`;

  return (
    <div className="w-64 h-screen bg-base-100 shadow-lg p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-6 text-orange-600">
          Precision Management
        </h2>
        <ul className="menu space-y-1">
          <li className="text-white nav-item">
            <NavLink to="/dashboard" className={navLinkClass}>
              <FiGrid /> Dashboard
            </NavLink>
          </li>
          <li className="text-white nav-item">
            <NavLink to="/projects" className={navLinkClass}>
              <FiFolder /> Projects
            </NavLink>
          </li>
          <li className="text-white nav-item">
            <NavLink to="/tasks" className={navLinkClass}>
              <FiFileText /> Tasks
            </NavLink>
          </li>
          <li className="text-white nav-item">
            <NavLink to="/clients" className={navLinkClass}>
              <FiUsers /> Clients
            </NavLink>
          </li>
          <li className="text-white nav-item">
            <NavLink to="/employees" className={navLinkClass}>
              <FiUserCheck /> Employees
            </NavLink>
          </li>
        </ul>
      </div>
      <button
        className="btn btn-outline btn-error mt-6 flex items-center gap-2 text-white"
        onClick={logout}
      >
        <FiLogOut /> Logout
      </button>
    </div>
  );
};

export default LeftNav;
