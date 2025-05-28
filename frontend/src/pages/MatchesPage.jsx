import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MatchesPage = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    teamA: "",
    teamB: "",
    date: "",
    venue: ""
  });

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await axios.get("https://s86-cricket-commentary-box.onrender.com/api/matches");
        setMatches(res.data);
      } catch (err) {
        console.error("Failed to fetch matches", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      try {
        const res = await axios.put(
          `https://s86-cricket-commentary-box.onrender.com/api/matches/${editingId}`,
          formData
        );
        setMatches((prev) =>
          prev.map((m) => (m._id === editingId ? res.data : m))
        );
      } catch (err) {
        console.error("Failed to update match", err);
      }
    } else {
      try {
        const res = await axios.post("https://s86-cricket-commentary-box.onrender.com/api/matches", formData);
        setMatches((prev) => [...prev, res.data]);
      } catch (err) {
        console.error("Failed to add match", err);
      }
    }

    setShowForm(false);
    setIsEditing(false);
    setEditingId(null);
    setFormData({ teamA: "", teamB: "", date: "", venue: "" });
  };

  const handleEdit = (match) => {
    setFormData({
      teamA: match.teamA,
      teamB: match.teamB,
      date: match.date.split("T")[0],
      venue: match.venue
    });
    setEditingId(match._id);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this match?")) return;
    try {
      await axios.delete(`https://s86-cricket-commentary-box.onrender.com/api/matches/${id}`);
      setMatches((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      console.error("Failed to delete match", err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Navbar isLandingPage={false} />
      <main className="flex-grow px-6 py-10">
        <h1 className="text-3xl font-bold mb-6 text-center">Matches</h1>

        {loading ? (
          <p>Loading matches...</p>
        ) : matches.length === 0 ? (
          <div className="text-center">
            <p className="mb-4">No matches found. Click below to add one.</p>
            {!showForm && (
              <button
                className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-full text-white font-semibold"
                onClick={() => setShowForm(true)}
              >
                Add Match
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="flex justify-end mb-4">
              <button
                className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-full text-white font-semibold"
                onClick={() => {
                  setShowForm(true);
                  setIsEditing(false);
                  setFormData({ teamA: "", teamB: "", date: "", venue: "" });
                }}
              >
                Add Match
              </button>
            </div>
            <div className="space-y-4">
              {matches.map((match) => (
                <div
                  key={match._id}
                  className="bg-gray-800 rounded-lg p-4 shadow-md"
                >
                  <p>
                    <strong>{match.teamA}</strong> vs <strong>{match.teamB}</strong>
                  </p>
                  <p>Date: {new Date(match.date).toLocaleDateString()}</p>
                  <p>Venue: {match.venue}</p>
                  <div className="mt-2 space-x-2">
                    <button
                      onClick={() => handleEdit(match)}
                      className="bg-blue-500 hover:bg-blue-600 px-4 py-1 rounded-full text-white text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(match._id)}
                      className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-full text-white text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mt-8 bg-gray-800 p-6 rounded-lg max-w-md mx-auto space-y-4"
          >
            <input
              type="text"
              name="teamA"
              placeholder="Team A"
              value={formData.teamA}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
            <input
              type="text"
              name="teamB"
              placeholder="Team B"
              value={formData.teamB}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
            <input
              type="text"
              name="venue"
              placeholder="Venue"
              value={formData.venue}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-full text-white font-semibold"
            >
              {isEditing ? "Update Match" : "Add Match"}
            </button>
          </form>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default MatchesPage;
