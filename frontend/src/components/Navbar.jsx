// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isLandingPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setIsOpen(false); // close menu on logout
    navigate("/");
  };

  return (
    <nav className="w-full px-6 py-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-md border-b border-cyan-500">
      <div className="max-w-7xl mx-auto flex justify-between items-center relative">
        <h1
          className="text-2xl font-extrabold tracking-wide text-cyan-400 cursor-pointer"
          onClick={() => {
            setIsOpen(false); // close menu on navigation
            navigate(isLandingPage ? "/" : "/");
          }}
        >
          Cricket Commentary Box
        </h1>

        {/* Hamburger button visible on small screens */}
        <div className="lg:hidden relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white text-2xl focus:outline-none"
            aria-label="Toggle menu"
          >
            ☰
          </button>

          {/* Dropdown menu */}
          <ul
            className={`
              lg:flex lg:gap-6 lg:text-lg lg:font-medium 
              ${isOpen ? "block bg-gray-800 rounded-md shadow-md p-4 absolute right-0 mt-2 w-40 z-50" : "hidden"}
            `}
          >
            {isLoggedIn ? (
              <>
                <li
                  className="hover:text-green-400 transition cursor-pointer py-2"
                  onClick={() => {
                    setIsOpen(false);
                    navigate("/profile");
                  }}
                >
                  Profile
                </li>
                <li
                  className="hover:text-green-400 transition cursor-pointer py-2"
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                >
                  Logout
                </li>
              </>
            ) : (
              <>
                <li
                  className="hover:text-green-400 transition cursor-pointer py-2"
                  onClick={() => {
                    setIsOpen(false);
                    navigate("/login");
                  }}
                >
                  Login
                </li>
                <li
                  className="hover:text-green-400 transition cursor-pointer py-2"
                  onClick={() => {
                    setIsOpen(false);
                    navigate("/signup");
                  }}
                >
                  Signup
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Desktop menu */}
        <ul className="hidden lg:flex gap-6 text-lg font-medium">
          {isLoggedIn ? (
            <>
              <li
                className="hover:text-green-400 transition cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                Profile
              </li>
              <li
                className="hover:text-green-400 transition cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </li>
            </>
          ) : (
            <>
              <li
                className="hover:text-green-400 transition cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login
              </li>
              <li
                className="hover:text-green-400 transition cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Signup
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
