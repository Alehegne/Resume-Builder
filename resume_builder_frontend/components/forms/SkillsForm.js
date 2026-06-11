"use client";

import { useState } from "react";
import { useResume } from "@/hooks/useResume";

export default function SkillsForm() {
  const { resume, addSkill, deleteSkill } = useResume();
  const [newSkill, setNewSkill] = useState("");
  const [error, setError] = useState("");
  const [proficiency, setProficiency] = useState(50);

  const handleAddSkill = () => {
    if (!newSkill.trim()) {
      setError("Please enter a skill");
      return;
    }

    if (
      resume.skills.some(
        (skill) => skill.name.toLowerCase() === newSkill.trim().toLowerCase(),
      )
    ) {
      setError("This skill has already been added");
      return;
    }

    addSkill({ name: newSkill.trim(), proficiency: proficiency });
    setNewSkill("");
    setProficiency(50);
    setError("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddSkill();
    }
  };

  // print("resume skills:", resume.skills);

  function getKeyForSkills(name) {
    return name + Math.random().toString(36).substr(2, 9);
  }

  return (
    <div className="bg-card p-6 rounded-lg border border-border">
      <h2 className="text-2xl font-bold text-foreground mb-6">Skills</h2>

      {/* Display Skills */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-3">
          {resume.skills.map((skill) => (
            <div
              key={getKeyForSkills(skill.name)}
              className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/30"
            >
              <span className="text-sm font-medium text-foreground">
                {skill.name}
              </span>
              <button
                onClick={() => deleteSkill(skill.name)}
                className="text-primary hover:text-primary/80 font-bold text-lg leading-none"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Add New Skill */}
      <div className="p-4 border-2 border-dashed border-border rounded-md space-y-4">
        <h3 className="font-medium text-foreground">Add New Skill</h3>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Skill Name
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => {
                setNewSkill(e.target.value);
                if (error) setError("");
              }}
              onKeyPress={handleKeyPress}
              className={`flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition ${
                error ? "border-destructive" : "border-border"
              }`}
              placeholder="e.g., JavaScript, React, Python..."
            />
            <button
              onClick={handleAddSkill}
              className="px-6 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition font-medium"
            >
              Add
            </button>
          </div>
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
          {/* proficiency */}
          <div className="mt-2">
            <label className="block text-sm font-medium text-foreground mb-2">
              Proficiency
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={proficiency}
              onChange={(e) => setProficiency(parseInt(e.target.value))}
              className="w-full"
            />
            <span className="text-sm text-foreground">{proficiency}%</span>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Press Enter or click Add to add a skill. Click the × to remove a
          skill.
        </p>
      </div>
    </div>
  );
}
