import React from "react";

const Navbar = () => {
  return (
    <div className="flex fixed w-full">

    <div className="bg-gray-900 ml-[300px] shadow-md shadow-gray-700/30  min-h-[80px] flex flex-1 items-center justify-between px-4 py-2">
      {/* <!-- Left Section --> */}
      <div className="flex-1">
        <a className="text-xl text-white font-thin">Socialoa</a>
      </div>

      {/* <!-- Right Section --> */}
      <div className="flex gap-4 items-center">
        {/* <!-- Search Input --> */}
        <input
          type="text"
          placeholder="Search"
          className="border border-gray-300 bg-gray-800 rounded-lg px-3 py-2 w-24 md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* <!-- Profile Dropdown --> */}
            <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300">
              <img
                alt="User Avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
      </div>
    </div>
    </div>
  );
};

export default Navbar;
