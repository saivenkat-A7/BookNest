import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const DashboardLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/");
  };

  return (
    <section className="bg-gray-100 min-h-screen">
      <main className="p-6 sm:p-10 space-y-6">
        <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
          <div className="mr-6">
            <h1 className="text-4xl font-semibold mb-2">Dashboard</h1>
            <h2 className="text-gray-600 ml-0.5">Book Store Inventory</h2>
          </div>
          <div className="flex flex-col md:flex-row items-start justify-end -mb-3">
            <Link to="/dashboard/manage-books" className="inline-flex px-5 py-3 text-purple-600 hover:bg-purple-100 border border-purple-600 rounded-md mb-3">
              Manage Books
            </Link>
            <Link to="/dashboard/add-new-book" className="inline-flex px-5 py-3 text-white bg-purple-600 hover:bg-purple-700 rounded-md ml-6 mb-3">
              Add New Book
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex px-5 py-3 ml-6 text-red-600 hover:text-red-700 hover:bg-red-100 border border-red-600 rounded-md mb-3"
            >
              Logout
            </button>
          </div>
        </div>
        <Outlet />
      </main>
    </section>
  );
};

export default DashboardLayout;
