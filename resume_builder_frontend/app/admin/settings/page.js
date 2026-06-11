"use client";

import { useEffect, useState } from "react";
import { getAuthHeaders } from "@/context/AuthContext";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteTitle: "Resume Builder",
    allowRegistration: true,
    maintenanceMode: false,
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/admin/settings.php",
          {
            headers: getAuthHeaders(),
          },
        );
        const data = await response.json();

        if (data.success && data.data) {
          setSettings((prev) => ({
            ...prev,
            ...data.data,
          }));
        }
      } catch (error) {
        setMessage({
          type: "error",
          text: "✕ Error loading settings: " + error.message,
        });
      }
    };

    loadSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(
        "http://localhost:8000/api/admin/settings.php",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
          },
          body: JSON.stringify(settings),
        },
      );
      const data = await response.json();
      if (data.success) {
        setMessage({ type: "success", text: "✓ Settings saved!" });
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({
          type: "error",
          text: "✕ " + (data.message || "Save failed"),
        });
      }
    } catch (error) {
      setMessage({ type: "error", text: "✕ Error: " + error.message });
    } finally {
      setSaving(false);
    }
  };
  return (
    <div className="space-y-8 max-w-2xl">
      <h1 className="text-3xl font-bold">Settings</h1>

      {message && (
        <div
          className={`${
            message.type === "success"
              ? "bg-green-50 border border-green-200 text-green-700"
              : "bg-red-50 border border-red-200 text-red-700"
          } p-4 rounded-xl`}
        >
          {message.text}
        </div>
      )}
      <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-6">
        <div>
          <label className="block mb-2 font-medium">Site Title</label>

          <input
            type="text"
            name="siteTitle"
            value={settings.siteTitle}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <div className="flex items-center justify-between">
          <span>Allow Registration</span>

          <input
            type="checkbox"
            name="allowRegistration"
            checked={settings.allowRegistration}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <span>Maintenance Mode</span>

          <input
            type="checkbox"
            name="maintenanceMode"
            checked={settings.maintenanceMode}
            onChange={handleChange}
          />
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </div>
  );
}
