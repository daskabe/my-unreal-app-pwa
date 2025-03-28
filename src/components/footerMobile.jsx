import React from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";

const FooterMobile = ({ onToggleSidenav }) => {
  return (
    <footer
      className="fixed bottom-0 left-0 right-0 text-white shadow-lg block md:hidden pb-5 pr-5 pl-5 z-50"
      style={{ backgroundColor: "rgba(6, 15, 15, 0.8)" }}
    >
      <div className="flex justify-between items-center p-2">
        {/* Home Button */}
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `flex flex-col items-center p-2 ${
              isActive ? "text-gray-900 font-semibold" : "text-white-100"
            }`
          }
        >
          <HomeIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </NavLink>

        {/* Forums Button */}
        <NavLink
          to="/forums"
          className={({ isActive }) =>
            `flex flex-col items-center p-2 ${
              isActive ? "text-gray-900 font-semibold" : "text-white"
            }`
          }
        >
          <ChatBubbleLeftRightIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Forums</span>
        </NavLink>

        {/* Messages Button */}
        <NavLink
          to="/messages"
          className={({ isActive }) =>
            `flex flex-col items-center p-2 ${
              isActive ? "text-gray-900 font-semibold" : "text-white"
            }`
          }
        >
          <EnvelopeIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Messages</span>
        </NavLink>

        {/* More Button */}
        <button
          type="button"
          onClick={onToggleSidenav}
          className="text-white bg-gradient-to-r from-purple-500 via-purple-600 
          to-purple-700 hover:bg-gradient-to-br 
          focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          <EllipsisHorizontalIcon className="w-6 h-6" />{" "}
          <span className="text-xs mt-1">More</span>
        </button>
      </div>
    </footer>
  );
};

export default FooterMobile;
