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
      const res = await fetch("https://s86-cricket-commentary-box.onrender.com/api/profile/bio", {
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
        <p className="text-center mt-10 text-gray-500">Loading...</p>
      </>
    );

  if (error)
    return (
      <>
        <Navbar />
        <p className="text-center mt-10 text-red-500">{error}</p>
      </>
    );

  if (!profile)
    return (
      <>
        <Navbar />
        <p className="text-center mt-10 text-gray-500">Could not load profile.</p>
      </>
    );

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-800 text-white rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold mb-6 border-b border-gray-700 pb-2">Profile</h2>

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
                className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <div className="mt-3 flex space-x-3">
                <button
                  onClick={handleSave}
                  className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white font-semibold transition"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditing(false);
                    setBio(profile.bio);
                    setError("");
                  }}
                  className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-white font-semibold transition"
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
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white font-semibold transition"
              >
                Edit Bio
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
