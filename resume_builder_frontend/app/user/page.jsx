"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getAuthHeaders } from "@/context/AuthContext";
import { exportResumeToPDF } from "@/utils/pdfExport";

const API_BASE = "http://localhost:8000/api";

export default function DashboardPage() {
  const router = useRouter();
  const { logout, user } = useAuth();

  const [stats, setStats] = useState({
    total_resumes: 0,
    last_updated: null,
    most_used_template: null,
  });
  const [resumes, setResumes] = useState([]);
  const [statsLoading, setStatsLoading] = useState(true);
  const [resumesLoading, setResumesLoading] = useState(true);
  const [statsError, setStatsError] = useState(null);
  const [resumesError, setResumesError] = useState(null);

  const getUserId = () => {
    if (typeof window === "undefined") return null;

    const storedUser = localStorage.getItem("user");
    if (!storedUser) return null;

    try {
      const parsedUser = JSON.parse(storedUser);
      return parsedUser?.userId || null;
    } catch {
      return null;
    }
  };

  const getAuthToken = () => {
    // Try to read token from `user` stored in localStorage (AuthContext saves user object)
    if (typeof window === "undefined") return null;
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return null;
    try {
      const parsed = JSON.parse(storedUser);
      return parsed?.token || null;
    } catch {
      return null;
    }
  };

  const getDay = (timeStamp) => {
    if (!timeStamp || timeStamp === "N/A") return "Never";

    const date = new Date(timeStamp);
    if (Number.isNaN(date.getTime())) return "Never";

    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  useEffect(() => {
    const userId = getUserId();
    const token = getAuthToken();

    if (!userId) {
      setStatsLoading(false);
      setResumesLoading(false);
      setStatsError("Unable to load your dashboard. Please sign in again.");
      setResumesError("Unable to load your dashboard. Please sign in again.");
      return;
    }

    const fetchStats = async () => {
      try {
        setStatsLoading(true);
        setStatsError(null);

        const response = await fetch(
          `${API_BASE}/user/analytics.php?userId=${userId}`,
          {
            headers: getAuthHeaders(),
          },
        );

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.message || "Failed to load statistics");
        }

        setStats(data.data || {});
      } catch (error) {
        setStatsError(error.message);
      } finally {
        setStatsLoading(false);
      }
    };

    const fetchResumes = async () => {
      try {
        setResumesLoading(true);
        setResumesError(null);

        const response = await fetch(
          `${API_BASE}/resume/get.php?user_id=${userId}`,
          {
            headers: getAuthHeaders(),
          },
        );

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.message || "Failed to load resumes");
        }

        setResumes(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        setResumesError(error.message);
      } finally {
        setResumesLoading(false);
      }
    };

    fetchStats();
    fetchResumes();
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleDelete = async (resumeId) => {
    if (!confirm("Are you sure you want to delete this resume?")) return;

    try {
      const response = await fetch(`${API_BASE}/resume/resume.php`, {
        method: "DELETE",
        headers: {
          ...getAuthHeaders(),
        },
        body: JSON.stringify({ resume_id: resumeId }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Delete failed");
      }

      setResumes((prev) => prev.filter((resume) => resume.id !== resumeId));
    } catch (error) {
      alert(`Error deleting resume: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-6 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                Welcome back, {user?.name || "User"} 👋
              </h1>
              <p className="mt-2 max-w-2xl text-slate-500">
                Build, edit, and manage your professional resumes in one place.
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
            >
              Log Out
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/templates"
              className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              + Create Resume
            </Link>
            <Link
              href="/profile"
              className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
            >
              Edit Profile
            </Link>
            <Link
              href="/resumes"
              className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
            >
              My Resumes
            </Link>
          </div>
        </section>

        {statsError && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
            ⚠️ {statsError}
          </div>
        )}

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total Resumes</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              {statsLoading ? "..." : stats.total_resumes || 0}
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Last Updated</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              {statsLoading ? "..." : getDay(stats.last_updated)}
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Most Used Template</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              {statsLoading ? "..." : stats.most_used_template || "None"}
            </h2>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Quick Actions</h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Link
              href="/builder"
              className="rounded-2xl bg-blue-50 p-4 transition hover:bg-blue-100"
            >
              <div className="text-sm font-medium text-blue-700">
                ➕ New Resume
              </div>
              <p className="mt-1 text-sm text-slate-500">
                Start from a fresh template.
              </p>
            </Link>

            <Link
              href="/resumes"
              className="rounded-2xl bg-slate-50 p-4 transition hover:bg-slate-100"
            >
              <div className="text-sm font-medium text-slate-800">
                📄 View Resumes
              </div>
              <p className="mt-1 text-sm text-slate-500">
                Open your saved profiles.
              </p>
            </Link>

            <Link
              href="/profile"
              className="rounded-2xl bg-slate-50 p-4 transition hover:bg-slate-100"
            >
              <div className="text-sm font-medium text-slate-800">
                👤 Edit Profile
              </div>
              <p className="mt-1 text-sm text-slate-500">
                Update your personal details.
              </p>
            </Link>

            <Link
              href="/builder"
              className="rounded-2xl bg-slate-50 p-4 transition hover:bg-slate-100"
            >
              <div className="text-sm font-medium text-slate-800">
                ✏️ Continue Editing
              </div>
              <p className="mt-1 text-sm text-slate-500">
                Pick up your latest draft.
              </p>
            </Link>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-slate-900">Recent Resumes</h2>
            {resumesLoading && (
              <span className="text-sm text-slate-500">Loading...</span>
            )}
          </div>

          {resumesError ? (
            <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
              ⚠️ {resumesError}
            </div>
          ) : resumes.length === 0 && !resumesLoading ? (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
              <p className="text-slate-600">No resumes yet.</p>
              <Link
                href="/builder"
                className="mt-4 inline-flex rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Create Your First Resume
              </Link>
            </div>
          ) : (
            <div className="mt-4 space-y-4">
              {resumes.map((resume) => (
                <div
                  key={resume.id}
                  className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {resume.title ||
                        resume.personal?.resumeTitle ||
                        "Untitled Resume"}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {resume.template || resume.selectedTemplate || "Template"}
                      {resume.updated ? ` • ${resume.updated}` : ""}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => router.push(`/builder/edit/${resume.id}`)}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(resume.id)}
                      className="rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
