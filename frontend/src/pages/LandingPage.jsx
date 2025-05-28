import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button"; 

const LandingPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); 

  useEffect(() => {
    // Check if user is logged in (check localStorage for a token)
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));  // Parse user info and set it
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null); 
  };

  return (
    <div
      className="flex relative flex-col min-h-screen text-white"
      style={{
        backgroundImage: `url('https://media.istockphoto.com/id/1176722220/photo/empty-green-grass-field-and-illuminated-outdoor-stadium-with-fans-front-field-view.jpg?s=612x612&w=0&k=20&c=YFh_7QVyJKuF9iBFgX4QF9c4-ojJE0_vCJjeORQExX4=')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="absolute top-0 w-full h-full"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <div className="flex flex-col min-h-screen">
          <Navbar isLandingPage={true} />
          <main className="flex flex-col items-center justify-center flex-grow text-center px-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 drop-shadow-xl">
              Welcome to the Cricket Commentary Box
            </h1>
            <p className="text-lg sm:text-xl mb-8 max-w-2xl drop-shadow-lg">
              Generate fun, exaggerated, and hilarious cricket commentary for your favorite matches.
            </p>
            
            {!isLoggedIn ? (
              <div className="mb-4">
                <Link to="/login">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition mr-4"
                  >
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition"
                  >
                    Signup
                  </button>
                </Link>
              </div>
            ) : (
              <div className="mb-4">
                {/* Show actual username */}
                <p className="text-lg mb-2">Hello, {user?.username || "User"}</p>

                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition mr-4"
                >
                  Logout
                </button>

                {/* "Get Started" button with green background */}
                <Link to="/dashboard">
                  <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition">
                    Get Started
                  </button>
                </Link>
              </div>
            )}
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
