import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <ul className="flex space-x-4">
        <li><Link to="/" className="hover:underline">Dashboard</Link></li>
        <li><Link to="/clients" className="hover:underline">Clients</Link></li>
        <li><Link to="/projects" className="hover:underline">Projects</Link></li>
        <li><Link to="/tasks" className="hover:underline">Tasks</Link></li>
        <li><Link to="/invoices" className="hover:underline">Invoices</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
