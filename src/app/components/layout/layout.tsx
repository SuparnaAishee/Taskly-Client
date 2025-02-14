import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { RiProgress5Line } from "react-icons/ri";
import { AiOutlineCheckCircle, AiFillSchedule } from "react-icons/ai";
import { FiBell } from "react-icons/fi"; 
import { FaUserCircle } from "react-icons/fa"; 

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-sky-100 text-black p-6  h-full top-0 left-0 z-10">
        <div className="text-center text-2xl font-bold mb-6">
          <img
            src="https://res.cloudinary.com/dwelabpll/image/upload/v1739538340/Screenshot_2025-02-14_153508-removebg-preview_ofbon8.png"
            alt="Logo"
            className="w-40 h-auto mb-4"
          />
        </div>
        <ul>
          <li className="flex items-center mb-6 hover:bg-cyan-500 p-2 rounded">
            <Link to="/">
              <MdOutlineDashboard className="mr-3 text-lg" />
              <span>Dashboard</span>
            </Link>
          </li>

          {/* Tasks Section with Nested Items */}
          <li className="flex flex-col">
            <div className="flex items-center mb-6 hover:bg-cyan-500 p-2 rounded cursor-pointer">
              <FaTasks className="mr-3 text-lg" />
              <span>Tasks</span>
            </div>
            <ul className="space-y-2 pl-4">
              <li className="flex items-center mb-2 hover:bg-cyan-500 p-2 rounded cursor-pointer">
                <Link to="/tasks/todo">
                  <AiFillSchedule className="mr-3 text-lg" />
                  <span>To Do</span>
                </Link>
              </li>
              <li className="flex items-center mb-2 hover:bg-cyan-500 p-2 rounded cursor-pointer">
                <Link to="/tasks/in-progress">
                  <RiProgress5Line className="mr-3 text-lg" />
                  <span>In Progress</span>
                </Link>
              </li>
              <li className="flex items-center mb-2 hover:bg-cyan-500 p-2 rounded cursor-pointer">
                <Link to="/tasks/completed">
                  <AiOutlineCheckCircle className="mr-3 text-lg" />
                  <span>Completed</span>
                </Link>
              </li>
            </ul>
          </li>

          {/* Notifications Section */}
          <li className="flex items-center mb-6 hover:bg-cyan-500 p-2 rounded">
            <Link to="/notifications">
              <FiBell className="mr-3 text-lg" />
              <span>Notifications</span>
            </Link>
          </li>

          {/* Profile Section */}
          <li className="flex items-center mb-6 hover:bg-cyan-500 p-2 rounded">
            <Link to="/profile">
              <FaUserCircle className="mr-3 text-lg" />
              <span>Profile</span>
            </Link>
          </li>

          {/* Logout Button */}
          <li className="flex items-center mt-8 hover:bg-cyan-500 p-2 rounded bg-white">
            <button className="text-red-500">Logout</button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1  p-6 bg-gray-100 pt-20">
        {/* Header */}
        <div className="fixed top-0 left-64 right-0 bg-white shadow-lg z-20 py-4 px-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-semibold text-green-600">
              Welcome to Taskly Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <button className="relative">
                <FiBell className="text-2xl text-gray-700" />
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-2 py-1">
                  5
                </span>
              </button>
              <FaUserCircle className="text-2xl text-gray-700" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="pt-24">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
