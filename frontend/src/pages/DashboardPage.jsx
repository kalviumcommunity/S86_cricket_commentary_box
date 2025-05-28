// src/pages/DashboardPage.jsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen text-white bg-gray-900">
      {/* Passing isLandingPage={false} to Navbar */}
      <Navbar isLandingPage={false} />
      <main className="flex flex-col items-center justify-center flex-grow text-center px-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 drop-shadow-xl">
          Welcome to Your Dashboard
        </h1>
        <p className="text-lg sm:text-xl mb-8 max-w-2xl drop-shadow-lg">
          Manage your cricket matches and commentary here!
        </p>
        <button
          onClick={() => navigate("/matches")}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition mb-4"
        >
          View Matches
        </button>
        <button
          onClick={() => navigate("/commentary")}
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition"
        >
          View Commentary
        </button>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
