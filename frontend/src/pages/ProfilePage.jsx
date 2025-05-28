import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [bio, setBio] = useState("");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setError("User not authenticated. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("https://s86-cricket-commentary-box.onrender.com/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Error ${res.status}: ${text}`);
        }

        const data = await res.json();
        setProfile(data);
        setBio(data.bio);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const handleSave = async () => {
    if (!token) {
      setError("User not authenticated. Please log in.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/profile/bio", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bio }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Error ${res.status}: ${text}`);
      }

      const data = await res.json();
      setProfile(data);
      setEditing(false);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading)
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          <p className="text-gray-400">Loading...</p>
        </div>
      </>
    );

  if (error)
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          <p className="text-red-500">{error}</p>
        </div>
      </>
    );

  if (!profile)
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          <p className="text-gray-400">Could not load profile.</p>
        </div>
      </>
    );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12 px-4">
        <div className="max-w-xl mx-auto p-8 bg-gray-800 text-white rounded-2xl shadow-2xl border border-gray-700">
          <h2 className="text-4xl font-bold mb-6 border-b border-gray-600 pb-3 text-center">
            Profile
          </h2>

          <p className="mb-2">
            <span className="font-semibold">Name:</span> {profile.username}
          </p>
          <p className="mb-4">
            <span className="font-semibold">Email:</span> {profile.email}
          </p>

          <div>
            <strong className="block mb-2">Bio:</strong>
            {editing ? (
              <>
                <textarea
                  rows="4"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <div className="mt-4 flex space-x-4">
                  <button
                    onClick={handleSave}
                    className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-white font-semibold transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditing(false);
                      setBio(profile.bio);
                      setError("");
                    }}
                    className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg text-white font-semibold transition"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="mb-3">{profile.bio || "No bio set."}</p>
                <button
                  onClick={() => setEditing(true)}
                  className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-white font-semibold transition"
                >
                  Edit Bio
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
