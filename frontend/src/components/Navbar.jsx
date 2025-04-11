import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <nav className="w-full px-6 py-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-md border-b border-cyan-500 relative">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left Side Options Button */}
        <div className="relative">
          <button
            className="text-cyan-400 text-lg font-bold px-4 py-2 border border-cyan-500 rounded-md hover:bg-cyan-500 hover:text-black transition"
            onClick={toggleMenu}
          >
            Options
          </button>
          {showMenu && (
            <div className="absolute mt-2 bg-gray-800 border border-gray-600 rounded-md shadow-lg z-10">
              <ul className="flex flex-col text-left">
                <li
                  className="py-2 px-4 hover:bg-gray-700 rounded cursor-pointer"
                  onClick={() => {
                    navigate("/commentary");
                    setShowMenu(false);
                  }}
                >
                  Commentary
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Title */}
        <h1
          className="text-2xl font-extrabold tracking-wide text-cyan-400 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Cricket Commentary Box
        </h1>

        {/* Right Navigation */}
        <ul className="flex gap-6 text-lg font-medium">
          <li
            className="hover:text-green-400 transition cursor-pointer"
            onClick={() => navigate("/")}
          >
            Home
          </li>
          <li className="hover:text-green-400 transition cursor-pointer">About</li>
          <li className="hover:text-green-400 transition cursor-pointer">Contact</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
