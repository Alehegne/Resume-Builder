"use client";
import DataTable from "../components/DataTable";
import SectionCard from "../components/SectionCard";
import { useEffect, useState } from "react";
import { getAuthHeaders } from "@/context/AuthContext";
export default function ResumesPage() {
  const [resumes, setResumes] = useState([]);

  //fetch resumes from backend
  useEffect(() => {
    fetch("http://localhost:8000/api/admin/index.php?type=resumes", {
      headers: getAuthHeaders(),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("Fetched resumes:", data.data);
          setResumes(data.data);
        }
      })
      .catch((err) => console.error("Error fetching resumes:", err));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Resumes</h1>

      <SectionCard title="All Resumes">
        <DataTable
          headers={["ID", "Title", "Template", "User", "Actions"]}
          rows={resumes.map((resume) => [
            resume.id,
            resume.title,
            resume.template,
            resume.user_name,
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => {
                // handle delete resume
                if (confirm("Are you sure you want to delete this resume?")) {
                  fetch(`http://localhost:8000/api/admin/resumes/delete.php`, {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                      ...getAuthHeaders(),
                    },
                    body: JSON.stringify({ resume_id: resume.id }),
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      if (data.success) {
                        alert("Resume deleted successfully");
                        setResumes(resumes.filter((r) => r.id !== resume.id));
                      } else {
                        alert("Failed to delete resume: " + data.message);
                      }
                    })
                    .catch((error) => {
                      console.error("Error deleting resume:", error);
                      alert("An error occurred while deleting the resume.");
                    });
                }
              }}
            >
              Delete
            </button>,
          ])}
        />
      </SectionCard>
    </div>
  );
}
