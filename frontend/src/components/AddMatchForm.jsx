import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddMatchForm = ({ matchId, onFormSubmit }) => {
  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");
  const [date, setDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null); // State to manage error message
  const navigate = useNavigate();

  useEffect(() => {
    if (matchId) {
      // Fetch match details if editing an existing match
      axios
        .get(`http://localhost:5000/api/matches/${matchId}`)
        .then((response) => {
          const match = response.data;
          setTeamA(match.teamA);
          setTeamB(match.teamB);

          // Make sure the date is in the correct format (YYYY-MM-DD)
          const matchDate = new Date(match.date);
          const formattedDate = matchDate.toISOString().split("T")[0]; // Format as "YYYY-MM-DD"
          setDate(formattedDate);
        })
        .catch((error) => {
          console.error("Error fetching match details:", error);
          setError("Failed to fetch match details. Please try again.");
        });
    } else {
      // Clear the form when adding a new match
      setTeamA("");
      setTeamB("");
      setDate("");
    }
  }, [matchId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null); // Clear previous error messages

    // Basic validation
    if (!teamA || !teamB || !date) {
      setError("All fields are required.");
      setIsSubmitting(false);
      return;
    }

    const matchData = { teamA, teamB, date };

    try {
      if (matchId) {
        // Update existing match
        await axios.put(`http://localhost:5000/api/matches/${matchId}`, matchData);
      } else {
        // Add new match
        await axios.post("http://localhost:5000/api/matches", matchData);
      }
      onFormSubmit(); // Reload matches after add/edit
      setTeamA(""); // Clear form
      setTeamB(""); // Clear form
      setDate(""); // Clear form
    } catch (err) {
      console.error("Error saving match:", err);
      setError("There was an error saving the match. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-white mb-6">
        {matchId ? "Edit Match" : "Add New Match"}
      </h2>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="teamA" className="block text-white font-semibold mb-2">
            Team A
          </label>
          <input
            id="teamA"
            type="text"
            value={teamA}
            onChange={(e) => setTeamA(e.target.value)}
            placeholder="Enter Team A"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="teamB" className="block text-white font-semibold mb-2">
            Team B
          </label>
          <input
            id="teamB"
            type="text"
            value={teamB}
            onChange={(e) => setTeamB(e.target.value)}
            placeholder="Enter Team B"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="date" className="block text-white font-semibold mb-2">
            Match Date
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-6 rounded-lg font-semibold text-white ${
            isSubmitting ? "bg-gray-500" : "bg-green-500 hover:bg-green-600"
          } transition`}
        >
          {isSubmitting ? "Submitting..." : matchId ? "Update Match" : "Add Match"}
        </button>
      </form>
    </div>
  );
};

export default AddMatchForm;
