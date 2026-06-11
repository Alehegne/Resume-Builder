"use client";

export default function TemplateMinimal({ resume }) {
  const { personal, education, experience, skills, projects } = resume;

  const getInitial = (name) => name?.charAt(0).toUpperCase() || "👤";

  return (
    <div
      id="resume-minimal"
      className="w-full max-w-4xl mx-auto bg-white text-gray-900 font-sans flex"
    >
      {/* Left Sidebar */}
      <div className="w-72 bg-gray-100 p-8 flex flex-col">
        {/* Profile Header */}
        <div className="mb-8">
          <div className="relative mb-6">
            {/* Decorative Header */}
            <div className="bg-gradient-to-r from-slate-700 to-slate-900 h-20 rounded-lg mb-4 relative">
              <div className="absolute -bottom-8 left-8 w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center border-4 border-white shadow-lg">
                <div className="text-4xl font-bold text-white">
                  {getInitial(personal.fullName)}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12">
            <h1 className="text-2xl font-bold text-slate-800 mb-1 leading-tight">
              {personal.fullName || "Your Name"}
            </h1>
            <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
              Professional Summary
            </p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mb-8 pb-6 border-b border-gray-300">
          {personal.email && (
            <div className="mb-3">
              <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Email
              </p>
              <p className="text-sm text-slate-600">{personal.email}</p>
            </div>
          )}
          {personal.phone && (
            <div className="mb-3">
              <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Phone
              </p>
              <p className="text-sm text-slate-600">{personal.phone}</p>
            </div>
          )}
          {personal.address && (
            <div>
              <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Location
              </p>
              <p className="text-sm text-slate-600">{personal.address}</p>
            </div>
          )}
        </div>

        {/* Technical Skills */}
        {skills.length > 0 && (
          <div className="mb-8 pb-6 border-b border-gray-300">
            <h2 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-4">
              Technical Skills
            </h2>
            <ul className="space-y-2">
              {skills.slice(0, 8).map((skill, idx) => (
                <li key={idx} className="text-sm text-slate-700">
                  {skill.name}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Extra Section */}
        <div className="mb-8 pb-6 border-b border-gray-300">
          <h2 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-4">
            Extra
          </h2>
          <div className="space-y-3 text-sm text-slate-700">
            <div>
              <p className="font-semibold text-slate-800 text-xs mb-1">Award</p>
              <p className="text-slate-600">Industry Excellence</p>
            </div>
          </div>
        </div>

        {/* Interests */}
        <div>
          <h2 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-4">
            Interests
          </h2>
          <ul className="space-y-2">
            <li className="text-sm text-slate-700">Innovation & Technology</li>
            <li className="text-sm text-slate-700">Professional Growth</li>
            <li className="text-sm text-slate-700">Creative Problem Solving</li>
          </ul>
        </div>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 p-10">
        {/* Main Header */}
        <div className="mb-8 pb-6 border-b-2 border-gray-300">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            {personal.fullName || "Your Name"}
          </h1>
          <p className="text-sm font-semibold text-slate-600 uppercase tracking-widest">
            Professional
          </p>
        </div>

        {/* Professional Summary */}
        <div className="mb-8">
          <p className="text-sm leading-relaxed text-gray-700">
            Accomplished professional with demonstrated expertise in{" "}
            {skills.slice(0, 2).join(" and ")}. Committed to delivering
            exceptional results through innovative solutions and continuous
            professional development.
          </p>
        </div>

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-10">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-6">
              Experience Continued
            </h2>
            <div className="space-y-6">
              {experience.map((exp, idx) => (
                <div key={idx}>
                  <h3 className="font-bold text-gray-900 text-base">
                    {exp.jobTitle}
                  </h3>
                  <p className="text-sm text-gray-600 font-semibold">
                    {exp.company} | {exp.duration}
                  </p>
                  {exp.description && (
                    <ul className="text-sm text-gray-700 mt-3 space-y-2 ml-4">
                      <li>• {exp.description}</li>
                      <li>
                        • Demonstrated key competencies in relevant areas of
                        expertise
                      </li>
                      <li>
                        • Contributed to team success and organizational goals
                      </li>
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-10">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-6">
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu, idx) => (
                <div key={idx}>
                  <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                  <p className="text-sm text-gray-600">{edu.school}</p>
                  <p className="text-xs text-gray-500">Graduated: {edu.year}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-6">
              Projects
            </h2>
            <div className="space-y-4">
              {projects.map((project, idx) => (
                <div key={idx}>
                  <h3 className="font-bold text-gray-900">{project.title}</h3>
                  <p className="text-sm text-gray-700">{project.description}</p>
                  {project.link && (
                    <a
                      href={project.link}
                      className="text-blue-600 text-sm hover:underline inline-block mt-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Project →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
