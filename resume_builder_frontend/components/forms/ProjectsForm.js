'use client';

import { useState } from 'react';
import { useResume } from '@/hooks/useResume';

export default function ProjectsForm() {
  const { resume, addProject, updateProject, deleteProject } = useResume();
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    link: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProject(prev => ({ ...prev, [name]: value }));
  };

  const handleAddProject = () => {
    if (!newProject.title.trim() || !newProject.description.trim()) {
      return;
    }

    addProject(newProject);
    setNewProject({ title: '', description: '', link: '' });
  };

  return (
    <div className="bg-card p-6 rounded-lg border border-border">
      <h2 className="text-2xl font-bold text-foreground mb-6">Projects</h2>

      {/* Display Existing Projects */}
      <div className="space-y-4 mb-6">
        {resume.projects.map(project => (
          <div key={project.id} className="bg-muted/30 p-4 rounded-md border border-border flex items-start justify-between">
            <div className="flex-1">
              <p className="font-medium text-foreground">{project.title}</p>
              <p className="text-sm text-muted-foreground">{project.description}</p>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  View Project
                </a>
              )}
            </div>
            <button
              onClick={() => deleteProject(project.id)}
              className="text-destructive hover:text-destructive/80 font-medium text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Add New Project */}
      <div className="space-y-4 p-4 border-2 border-dashed border-border rounded-md">
        <h3 className="font-medium text-foreground">Add Project</h3>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Project Title *
          </label>
          <input
            type="text"
            name="title"
            value={newProject.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition"
            placeholder="E-commerce Platform"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Description *
          </label>
          <textarea
            name="description"
            value={newProject.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition"
            rows="3"
            placeholder="Describe your project and your role in it..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Project Link
          </label>
          <input
            type="url"
            name="link"
            value={newProject.link}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition"
            placeholder="https://github.com/yourname/project"
          />
        </div>

        <button
          onClick={handleAddProject}
          className="w-full px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!newProject.title.trim() || !newProject.description.trim()}
        >
          Add Project
        </button>
      </div>
    </div>
  );
}
