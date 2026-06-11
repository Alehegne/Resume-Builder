"use client";
import React from "react";
import { getTemplate } from "@/lib/templates";
import { getAuthHeaders } from "@/context/AuthContext";

const Resumes = () => {
  const [userId, setUserId] = React.useState(null);
  const [resumes, setResumes] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      window.location.href = "/login";
      return;
    }

    setUserId(user.userId);
  }, []);

  //Fetch resumes
  React.useEffect(() => {
    if (!userId) return;

    const fetchResumes = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://localhost:8000/api/resume/resume.php?user_id=${userId}`,
          {
            headers: getAuthHeaders(),
          },
        );

        if (!res.ok) throw new Error("Failed to fetch resumes");

        const data = await res.json();

        if (!data.success) {
          throw new Error(data.message || "Error fetching resumes");
        }

        setResumes(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResumes();
  }, [userId]);

  function deleteResume(resumeId) {
    if (!confirm("Are you sure you want to delete this resume?")) return;

    fetch(`http://localhost:8000/api/resume/resume.php`, {
      method: "DELETE",
      headers: {
        ...getAuthHeaders(),
      },
      body: JSON.stringify({ resume_id: resumeId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) throw new Error(data.message || "Delete failed");
        alert("Resume deleted successfully");
        setResumes(resumes.filter((r) => r.id !== resumeId));
      })
      .catch((err) => alert("Error deleting resume: " + err.message));
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 md:px-12 py-10">
      {/* 🔹 Header */}
      <div className="max-w-5xl mx-auto mb-10">
        <h1 className="text-4xl font-bold mb-2">My Resumes</h1>
        <p className="text-gray-600">
          This page shows all the resumes you’ve created. You can preview, edit,
          or manage them. Each resume is displayed exactly how it would appear
          when exported or shared.
        </p>

        <div className="flex gap-3 mt-5 flex-wrap">
          <button
            onClick={() => (window.location.href = "/templates")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            + Create New Resume
          </button>
          <button
            onClick={() => (window.location.href = "/user")}
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300"
          >
            Dashboard
          </button>
        </div>
      </div>

      {/* States */}
      {isLoading && (
        <div className="text-center text-gray-500 py-12">
          Loading resumes...
        </div>
      )}

      {error && (
        <div className="max-w-5xl mx-auto bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
          ⚠️ {error}
        </div>
      )}

      {!isLoading && resumes.length === 0 && (
        <div className="text-center text-gray-500 py-12">
          <p className="mb-4">No resumes found</p>
          <button
            onClick={() => (window.location.href = "/templates")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 inline-block"
          >
            Create Your First Resume
          </button>
        </div>
      )}

      {/* Resume List*/}
      <div className="max-w-5xl mx-auto space-y-8">
        {resumes.map((resume) => {
          const SelectedTemplate = getTemplate(resume.selectedTemplate);

          return (
            <div
              key={resume.id}
              className="bg-white border rounded-xl shadow-sm"
            >
              {/*Top Bar */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-5 border-b gap-4">
                <div>
                  <h2 className="text-xl font-semibold">
                    {resume.personal?.resumeTitle || "Untitled Resume"}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Template: {resume.selectedTemplate}
                  </p>
                </div>

                <div className="flex gap-4 w-full md:w-auto">
                  <button
                    onClick={() =>
                      (window.location.href = `/builder/edit/${resume.id}`)
                    }
                    className="flex-1 md:flex-none px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteResume(resume.id)}
                    className="flex-1 md:flex-none px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/*Full Resume Preview */}
              <div className="p-6 overflow-auto">
                <div className="border shadow-sm">
                  <SelectedTemplate resume={resume} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Resumes;
