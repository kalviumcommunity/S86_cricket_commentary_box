import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CommentaryCard from "../components/CommentaryCard";
import { useNavigate } from "react-router-dom";

const CommentaryPage = () => {
  const [commentaries, setCommentaries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/api/commentary")
      .then((res) => res.json())
      .then((data) => setCommentaries(data))
      .catch((error) => console.error("Error fetching commentaries:", error));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <Navbar />

      <main className="flex-grow px-6 py-10 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">All Commentaries</h2>

        <div className="mb-8">
          <button
            onClick={() => navigate("/add-commentary")}
            className="px-5 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-md transition"
          >
            + Add Commentary
          </button>
        </div>

        <div className="flex flex-col gap-6">
          {commentaries.length === 0 ? (
            <p className="text-gray-400 text-center">No commentaries yet.</p>
          ) : (
            commentaries.map((commentary) => (
              <CommentaryCard
                key={commentary._id}
                commentator={commentary.commentator}
                style={commentary.style}
                text={commentary.text}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default CommentaryPage;
