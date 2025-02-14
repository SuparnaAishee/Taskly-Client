import React, { JSX } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { RootState } from "../../store/store";


const Layout = ({ children }: { children: JSX.Element }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 bg-blue-600 text-white">
        <div className="p-6">
          <h2 className="text-2xl font-semibold">Taskly</h2>
        </div>
        <nav className="mt-8">
          <ul>
            <li>
              <Link
                to="/dashboard"
                className="block py-2 px-6 hover:bg-blue-700"
              >
                Dashboard
              </Link>
            </li>
            {/* Add more links as needed */}
            <li>
              <button
                onClick={handleLogout}
                className="block py-2 px-6 w-full text-left hover:bg-blue-700"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div className="flex-1 p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div>
            {user && (
              <span className="text-sm text-gray-600">
                Welcome, {user.email}
              </span>
            )}
          </div>
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
