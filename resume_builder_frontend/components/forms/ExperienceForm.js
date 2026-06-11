'use client';

import { useState } from 'react';
import { useResume } from '@/hooks/useResume';
import { validateExperience } from '@/utils/validators';

export default function ExperienceForm() {
  const { resume, addExperience, updateExperience, deleteExperience } = useResume();
  const [newExperience, setNewExperience] = useState({
    jobTitle: '',
    company: '',
    duration: '',
    description: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewExperience(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAddExperience = () => {
    const validationErrors = validateExperience(newExperience);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    addExperience(newExperience);
    setNewExperience({ jobTitle: '', company: '', duration: '', description: '' });
    setErrors({});
  };

  return (
    <div className="bg-card p-6 rounded-lg border border-border">
      <h2 className="text-2xl font-bold text-foreground mb-6">Work Experience</h2>

      {/* Display Existing Experience */}
      <div className="space-y-4 mb-6">
        {resume.experience.map(exp => (
          <div key={exp.id} className="bg-muted/30 p-4 rounded-md border border-border flex items-start justify-between">
            <div className="flex-1">
              <p className="font-medium text-foreground">{exp.jobTitle}</p>
              <p className="text-sm text-muted-foreground">{exp.company}</p>
              <p className="text-sm text-muted-foreground">{exp.duration}</p>
              {exp.description && <p className="text-sm mt-2 text-foreground">{exp.description}</p>}
            </div>
            <button
              onClick={() => deleteExperience(exp.id)}
              className="text-destructive hover:text-destructive/80 font-medium text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Add New Experience */}
      <div className="space-y-4 p-4 border-2 border-dashed border-border rounded-md">
        <h3 className="font-medium text-foreground">Add Experience</h3>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Job Title *
          </label>
          <input
            type="text"
            name="jobTitle"
            value={newExperience.jobTitle}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition ${
              errors.jobTitle ? 'border-destructive' : 'border-border'
            }`}
            placeholder="Senior Software Engineer"
          />
          {errors.jobTitle && <p className="text-sm text-destructive mt-1">{errors.jobTitle}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Company *
          </label>
          <input
            type="text"
            name="company"
            value={newExperience.company}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition ${
              errors.company ? 'border-destructive' : 'border-border'
            }`}
            placeholder="Tech Company Inc."
          />
          {errors.company && <p className="text-sm text-destructive mt-1">{errors.company}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Duration *
          </label>
          <input
            type="text"
            name="duration"
            value={newExperience.duration}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition ${
              errors.duration ? 'border-destructive' : 'border-border'
            }`}
            placeholder="Jan 2022 - Present"
          />
          {errors.duration && <p className="text-sm text-destructive mt-1">{errors.duration}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={newExperience.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition"
            rows="3"
            placeholder="Describe your key responsibilities and achievements..."
          />
        </div>

        <button
          onClick={handleAddExperience}
          className="w-full px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition font-medium"
        >
          Add Experience
        </button>
      </div>
    </div>
  );
}
