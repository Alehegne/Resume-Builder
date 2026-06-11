"use client";

import { useState } from "react";
import { useResume } from "@/hooks/useResume";
import { validateEducation } from "@/utils/validators";
import { useEffect } from "react";

export default function EducationForm() {
  const { resume, addEducation, updateEducation, deleteEducation } =
    useResume();
  const [newEducation, setNewEducation] = useState({
    school: "",
    degree: "",
    year: "",
  });
  const [errors, setErrors] = useState({});
  const { errors: resumeErrors } = useResume();
  useEffect(() => {
    setErrors(resumeErrors.education || {});
  }, [resumeErrors.education]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEducation((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleAddEducation = () => {
    const validationErrors = validateEducation(newEducation);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    addEducation(newEducation);
    setNewEducation({ school: "", degree: "", year: "" });
    setErrors({});
  };

  return (
    <div className="bg-card p-6 rounded-lg border border-border">
      <h2 className="text-2xl font-bold text-foreground mb-6">Education</h2>

      {errors.education && (
        <div className="mb-4 p-4 bg-destructive/10 border border-destructive text-destructive rounded-md">
          {errors.education}
        </div>
      )}

      {/* Display Existing Education */}
      <div className="space-y-4 mb-6">
        {resume.education.map((edu) => (
          <div
            key={edu.id}
            className="bg-muted/30 p-4 rounded-md border border-border flex items-start justify-between"
          >
            <div className="flex-1">
              <p className="font-medium text-foreground">{edu.degree}</p>
              <p className="text-sm text-muted-foreground">{edu.school}</p>
              <p className="text-sm text-muted-foreground">{edu.year}</p>
            </div>
            <button
              onClick={() => deleteEducation(edu.id)}
              className="text-destructive hover:text-destructive/80 font-medium text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Add New Education */}
      <div className="space-y-4 p-4 border-2 border-dashed border-border rounded-md">
        <h3 className="font-medium text-foreground">Add Education</h3>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            School/University *
          </label>
          <input
            type="text"
            name="school"
            value={newEducation.school}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition ${
              errors.school ? "border-destructive" : "border-border"
            }`}
            placeholder="University of California"
          />
          {errors.school && (
            <p className="text-sm text-destructive mt-1">{errors.school}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Degree *
          </label>
          <input
            type="text"
            name="degree"
            value={newEducation.degree}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition ${
              errors.degree ? "border-destructive" : "border-border"
            }`}
            placeholder="Bachelor of Science in Computer Science"
          />
          {errors.degree && (
            <p className="text-sm text-destructive mt-1">{errors.degree}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Graduation Year *
          </label>
          <input
            type="text"
            name="year"
            value={newEducation.year}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition ${
              errors.year ? "border-destructive" : "border-border"
            }`}
            placeholder="2023"
          />
          {errors.year && (
            <p className="text-sm text-destructive mt-1">{errors.year}</p>
          )}
        </div>

        <button
          onClick={handleAddEducation}
          className="w-full px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition font-medium"
        >
          Add Education
        </button>
      </div>
    </div>
  );
}
