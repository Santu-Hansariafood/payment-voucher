import React from "react";
import { RxCross1 } from "react-icons/rx";
import HFLOGO from "../../../Image/Hansaria-Logo.png";

const Header = ({ isLoggedIn, handleLoginLogout }) => {
  return (
    <header className="w-full bg-gray-900 text-white py-4 px-8 flex justify-between items-center">
      <div className="flex items-center">
        <img src={HFLOGO} alt="Logo" className="h-10 w-10 mr-2" />
      </div>
      <button
        onClick={handleLoginLogout}
        className={`px-4 py-2 rounded ${
          isLoggedIn
            ? "bg-red-500 hover:bg-red-600"
            : "bg-blue-500 hover:bg-blue-600"
        } hidden md:block`}
      >
        {isLoggedIn ? "Logout" : "Login"}
      </button>
      <button onClick={handleLoginLogout} className={`text-white md:hidden`}>
        <RxCross1 size={24} />
      </button>
    </header>
  );
};

export default Header;
