"use client";
import { useState, useEffect, useRef } from "react";
import DataTable from "../components/DataTable";
import SectionCard from "../components/SectionCard";
import { getAuthHeaders } from "@/context/AuthContext";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  const allUsers = useRef([]);

  //fetch users from backend
  useEffect(() => {
    fetch("http://localhost:8000/api/admin/index.php?type=users", {
      headers: getAuthHeaders(),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setUsers(data.data);
          allUsers.current = data.data;
        }
      })
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const searchTimeout = useRef(null);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();

    // clear previous timeout
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(() => {
      // if query is empty -> restore all users
      if (!query.trim()) {
        setUsers(allUsers.current);
        return;
      }

      const filteredUsers = allUsers.current.filter(
        (user) =>
          user?.name?.toLowerCase().includes(query) ||
          user?.email?.toLowerCase().includes(query),
      );

      setUsers(filteredUsers);
    }, 500);
  };

  const handleDenyAccess = (userId, userName) => {
    if (!confirm(`Are you sure you want to deny access to ${userName}?`))
      return;

    fetch(`http://localhost:8000/api/admin/users/deny.php`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify({ user_id: userId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert(`Access denied for ${userName}`);
          setUsers((prev) => prev.filter((u) => u.id !== userId));
          allUsers.current = allUsers.current.filter((u) => u.id !== userId);
        } else {
          alert("Error: " + (data.message || "Failed to deny access"));
        }
      })
      .catch((err) => alert("Error: " + err.message));
  };

  const handleRestoreAccess = (userId, userName) => {
    if (!confirm(`Restore access for ${userName}?`)) return;

    fetch(`http://localhost:8000/api/admin/users/restore.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify({ user_id: userId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert(`Access restored for ${userName}`);
          setUsers((prev) =>
            prev.map((user) =>
              user.id === userId ? { ...user, role: "user" } : user,
            ),
          );
          allUsers.current = allUsers.current.map((user) =>
            user.id === userId ? { ...user, role: "user" } : user,
          );
        } else {
          alert("Error: " + (data.message || "Failed to restore access"));
        }
      })
      .catch((err) => alert("Error: " + err.message));
  };
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  if (showImageDialog) {
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={() => setShowImageDialog(false)}
      >
        <img
          src={selectedImage}
          alt="Profile"
          className="max-w-[80vw] max-h-[80vh] rounded-lg object-contain"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    );
  }

  const Avatar = ({ user }) => {
    if (user.profile_picture) {
      //when clicked, show the image in 800 * 600 dialog box
      return (
        <img
          src={`http://localhost:8000/${user.profile_picture}`}
          alt={`${user.name}'s profile`}
          className="w-10 h-10 rounded-full object-cover"
          onClick={() => {
            setSelectedImage(`http://localhost:8000/${user.profile_picture}`);
            setShowImageDialog(true);
          }}
        />
      );
    } else {
      return (
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm text-gray-600">
          {user && user.name ? user.name.charAt(0).toUpperCase() : "?"}
        </div>
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Users</h1>

        <input
          type="text"
          placeholder="Search users..."
          className="border rounded-lg px-4 py-2"
          onChange={handleSearch}
        />
      </div>

      <SectionCard title="All Users">
        {users.length === 0 ? (
          <p className="text-slate-500">No users found.</p>
        ) : (
          <DataTable
            headers={["ID", "Name", "Email", "Role", "Actions"]}
            rows={users.map((user) => [
              user.id,
              user.name,
              user.email,
              user.role || "User",
              Avatar({ user }),
              user.role === "denied" ? (
                <button
                  className="text-emerald-600 hover:text-emerald-700"
                  onClick={() => handleRestoreAccess(user.id, user.name)}
                >
                  Restore Access
                </button>
              ) : (
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDenyAccess(user.id, user.name)}
                >
                  Deny Access
                </button>
              ),
            ])}
          />
        )}
      </SectionCard>
    </div>
  );
}
