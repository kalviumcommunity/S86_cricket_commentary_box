// src/pages/AddCommentary.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const AddCommentary = () => {
  const [formData, setFormData] = useState({
    commentator: "",
    style: "",
    text: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/api/commentary", formData);
    navigate("/"); // Redirect to homepage
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="flex items-center justify-center px-6 py-10">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md space-y-4"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Add Commentary</h2>

          <input
            type="text"
            name="commentator"
            placeholder="Commentator Name"
            value={formData.commentator}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-700 text-white"
            required
          />

          <input
            type="text"
            name="style"
            placeholder="Style"
            value={formData.style}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-700 text-white"
            required
          />

          <textarea
            name="text"
            placeholder="Commentary Text"
            value={formData.text}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-700 text-white"
            rows="4"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded font-bold"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCommentary;
