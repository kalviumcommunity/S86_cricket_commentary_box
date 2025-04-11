import axios from "axios";

const API_BASE = "https://s86-cricket-commentary-bot.onrender.com";

export const fetchCommentaries = async () => {
  try {
    const response = await axios.get(`${API_BASE}/api/commentary`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch commentaries:", error);
    return [];
  }
};
