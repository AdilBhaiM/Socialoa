import React from "react";
import { CalendarCheck, ChartArea, Key, LayoutDashboard, LogOut } from "lucide-react";
import { Logout } from "../redux/actions/AuthActions";
import { useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  const {pathname} = useLocation();
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(Logout());
  };
  return (
    /* From Uiverse.io by sahilxkhadka */
    <div className="fixed h-screen card w-[300px] bg-gray-900 p-5 shadow-md shadow-purple-200/50 rounded-md">
      <ul className="w-full flex flex-col gap-2">
        <li className="flex-center cursor-pointer p-16-semibold w-full whitespace-nowrap">
          <NavLink to="/dashboard" className={pathname == "/dashboard" ? "flex size-full text-white gap-4 py-3 px-8 font-medium rounded-full shadow-inner bg-gray-700 from-purple-400 transition-all ease-linear" : "flex size-full text-white gap-4 py-3 px-8 font-medium rounded-full bg-cover hover:bg-gray-700 hover:shadow-inner from-purple-400 transition-all ease-linear"}>
            <LayoutDashboard />
            Dashboard
          </NavLink>
        </li>
        <li className="flex-center cursor-pointer p-16-semibold w-full whitespace-nowrap">
          <NavLink to="/schedule_post" className={pathname == "/schedule_post" ? "flex size-full text-white gap-4 py-3 px-8 font-medium rounded-full shadow-inner bg-gray-700 from-purple-400 transition-all ease-linear" : "flex size-full text-white gap-4 py-3 px-8 font-medium rounded-full bg-cover hover:bg-gray-700 hover:shadow-inner from-purple-400 transition-all ease-linear"}>
            {/* <Settings /> */}
            <CalendarCheck />
            Schedule Task
          </NavLink>
        </li>
        <li className="flex-center flex-1 cursor-pointer p-16-semibold w-full">
          <NavLink to="/analytics"
            className={pathname == "/analytics" ? "flex size-full text-white gap-4 py-3 px-8 font-medium rounded-full shadow-inner bg-gray-700 from-purple-400 transition-all ease-linear" : "flex size-full text-white gap-4 py-3 px-8 font-medium rounded-full bg-cover hover:bg-gray-700 hover:shadow-inner from-purple-400 transition-all ease-linear"}
          >
            <ChartArea />
            Analytics
          </NavLink>
        </li>
        <li className="flex-center flex-1 cursor-pointer p-16-semibold w-full">
          <NavLink to="/Api_Key"
            className={pathname == "/Api_Key" ? "flex size-full text-white gap-4 py-3 px-8 font-medium rounded-full shadow-inner bg-gray-700 from-purple-400 transition-all ease-linear" : "flex size-full text-white gap-4 py-3 px-8 font-medium rounded-full bg-cover hover:bg-gray-700 hover:shadow-inner from-purple-400 transition-all ease-linear"}
          >
            <Key  />
            Api_Key
          </NavLink>
        </li>
        <li className="flex-center cursor-pointer p-16-semibold w-full whitespace-nowrap">
          <button
            onClick={logout}
            className="flex size-full text-white gap-4 py-3 px-8 font-medium rounded-full bg-cover hover:bg-red-700 hover:shadow-inner focus:bg-red-700 transition-all ease-linear"
          >
            <LogOut />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
