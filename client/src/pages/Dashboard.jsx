import React from 'react';

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 shadow rounded">Clients: 10</div>
        <div className="bg-white p-4 shadow rounded">Projects: 5</div>
        <div className="bg-white p-4 shadow rounded">Invoices: 2 unpaid</div>
      </div>
    </div>
  );
};

export default Dashboard;
