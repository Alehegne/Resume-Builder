"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getAuthHeaders } from "@/context/AuthContext";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const { user } = useAuth();
  console.log("Current user in ProfilePage:", user);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/user/profile.php?user_id=" + user.userId,
          {
            headers: getAuthHeaders(),
          },
        );
        const data = await response.json();
        if (data.success) {
          setName(data.data.name || "");
          setEmail(data.data.email || "");
          setPreview(data.data.profile_picture || null);
        } else {
          console.error("Failed to fetch profile:", data.message);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // $email = $data["email"] ?? $existingUser["email"];
    // $profile_picture =
    //   $data["profile_picture"] ?? $existingUser["profile_picture"];
    // $password = $data["password"] ?? null;
    // $confirm_password = $data["confirm_password"] ?? null;
    //url = "http://localhost:8000/api/user/profile.php?user_id=" + userId;
    //in json format

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if (password) {
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      formData.append("password", password);
      formData.append("confirm_password", confirmPassword);
    }
    if (image) {
      formData.append("profile_picture", image);
    }

    try {
      // For FormData we must not set Content-Type; include only Authorization header
      const rawHeaders = getAuthHeaders();
      if (rawHeaders["Content-Type"]) delete rawHeaders["Content-Type"];

      const response = await fetch(
        "http://localhost:8000/api/user/profile.php?user_id=" + user.userId,
        {
          method: "POST",
          headers: rawHeaders,
          body: formData,
        },
      );
      const data = await response.json();
      if (data.success) {
        alert("Profile updated successfully");
      } else {
        alert("Failed to update profile: " + data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating the profile.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {/* HEADER */}
      <div className="w-full">
        <div className="flex items-center  justify-between">
          <h1 className="text-3xl font-bold">Edit Profile</h1>
          <button
            onClick={() => (window.location.href = "/user")}
            className="ml-4 mt-5 bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300"
          >
            Dashboard
          </button>
        </div>
        <p className="text-slate-500">Update your personal information</p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded-2xl p-6 space-y-5"
      >
        {/* PROFILE IMAGE */}
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center">
            {preview ? (
              <img src={preview} className="w-full h-full object-cover" />
            ) : (
              <span className="text-slate-500 text-sm">No Image</span>
            )}
          </div>

          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        {/* NAME */}
        <div>
          <label className="text-sm text-slate-600">Name</label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 mt-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        {/* EMAIL */}
        <div>
          <label className="text-sm text-slate-600">Email</label>
          <input
            type="email"
            className="w-full border rounded-lg px-3 py-2 mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        {/* PASSWORD */}
        <div>
          <label className="text-sm text-slate-600">Password (optional)</label>
          <input
            type="password"
            className="w-full border rounded-lg px-3 py-2 mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Leave empty to keep current password"
          />
          {/* CONFIRM PASSWORD */}
          <input
            type="password"
            className="w-full border rounded-lg px-3 py-2 mt-1"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your new password"
          />
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
