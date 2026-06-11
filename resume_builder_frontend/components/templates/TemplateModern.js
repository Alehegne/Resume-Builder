"use client";

export default function TemplateModern({ resume }) {
  const { personal, education, experience, skills, projects } = resume;

  const getInitial = (name) => name?.charAt(0).toUpperCase() || "👤";

  const getTwoSkills = () => {
    if (skills.length === 0) return "your skills";
    if (skills.length === 1) return skills[0].name;
    return `${skills[0].name} and ${skills[1].name}`;
  };

  console.log("Skills in TemplateModern:", skills);

  return (
    <div
      id="resume-modern"
      className="w-full max-w-4xl mx-auto bg-white text-gray-900 font-sans flex"
    >
      {/* Left Sidebar */}
      <div className="w-80 bg-gradient-to-b from-blue-900 to-slate-800 text-white p-8 flex flex-col">
        {/* Profile Section */}
        <div className="mb-8 text-center">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center mx-auto mb-4 border-4 border-blue-700 shadow-lg">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-300 to-blue-500 flex items-center justify-center text-3xl font-bold">
              {getInitial(personal.fullName)}
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-1">
            {personal.fullName || "Your Name"}
          </h1>
          <p className="text-amber-300 font-semibold text-sm uppercase tracking-wide">
            Professional
          </p>
        </div>

        <div className="border-t border-blue-700 pt-6 mb-6"></div>

        {/* Contact Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-amber-400 text-blue-900 flex items-center justify-center text-sm font-bold">
              📞
            </div>
            <h2 className="text-lg font-bold text-amber-300 uppercase tracking-wide">
              Contact
            </h2>
          </div>
          <div className="space-y-3 text-sm ml-8">
            {personal.email && (
              <div>
                <p className="text-amber-300 font-semibold text-xs">Email</p>
                <p className="text-gray-200">{personal.email}</p>
              </div>
            )}
            {personal.phone && (
              <div>
                <p className="text-amber-300 font-semibold text-xs">Phone</p>
                <p className="text-gray-200">{personal.phone}</p>
              </div>
            )}
            {personal.address && (
              <div>
                <p className="text-amber-300 font-semibold text-xs">Location</p>
                <p className="text-gray-200">{personal.address}</p>
              </div>
            )}
          </div>
        </div>

        {/* Skills Section */}
        {skills.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-amber-400 text-blue-900 flex items-center justify-center text-sm font-bold">
                💡
              </div>
              <h2 className="text-lg font-bold text-amber-300 uppercase tracking-wide">
                Skills
              </h2>
            </div>
            <div className="space-y-3 ml-8">
              {skills.slice(0, 6).map((skill, idx) => (
                <div key={idx}>
                  <p className="text-sm font-medium mb-1 text-gray-100">
                    {skill.name}
                  </p>

                  <div className="w-full bg-blue-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-amber-400 to-yellow-500 h-2 rounded-full"
                      style={{ width: `${skill.proficiency}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Interests Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-amber-400 text-blue-900 flex items-center justify-center text-sm font-bold">
              ❤️
            </div>
            <h2 className="text-lg font-bold text-amber-300 uppercase tracking-wide">
              Interests
            </h2>
          </div>
          <ul className="text-sm text-gray-200 space-y-2 ml-8">
            <li>Professional Development</li>
            <li>Technology & Innovation</li>
            <li>Creative Solutions</li>
          </ul>
        </div>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 p-10">
        {/* Profile Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-amber-400 text-blue-900 flex items-center justify-center font-bold text-lg">
              👤
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
            <div className="flex-1 border-t border-gray-300 ml-4"></div>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed mt-4">
            Dedicated professional with expertise in {getTwoSkills()}.
            Passionate about delivering high-quality results and continuously
            improving professional skills. Seeking to leverage experience to
            contribute meaningfully.
          </p>
        </div>

        {/* Experience Section */}
        {experience.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-amber-400 text-blue-900 flex items-center justify-center font-bold text-lg">
                💼
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Experience</h2>
              <div className="flex-1 border-t border-gray-300 ml-4"></div>
            </div>
            <div className="space-y-6 ml-8">
              {experience.map((exp, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-amber-400 border-2 border-blue-900"></div>
                  <div className="ml-4">
                    <h3 className="font-bold text-gray-900 text-lg">
                      {exp.jobTitle}
                    </h3>
                    <p className="text-sm text-gray-600 font-semibold">
                      {exp.company}
                    </p>
                    <p className="text-xs text-gray-500 mb-2">{exp.duration}</p>
                    {exp.description && (
                      <p className="text-sm text-gray-700">{exp.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education Section */}
        {education.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-amber-400 text-blue-900 flex items-center justify-center font-bold text-lg">
                🎓
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Education</h2>
              <div className="flex-1 border-t border-gray-300 ml-4"></div>
            </div>
            <div className="space-y-4 ml-8">
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

        {/* Projects Section */}
        {projects.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-amber-400 text-blue-900 flex items-center justify-center font-bold text-lg">
                📁
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
              <div className="flex-1 border-t border-gray-300 ml-4"></div>
            </div>
            <div className="space-y-4 ml-8">
              {projects.map((project, idx) => (
                <div key={idx}>
                  <h3 className="font-bold text-gray-900">{project.title}</h3>
                  <p className="text-sm text-gray-700">{project.description}</p>
                  {project.link && (
                    <a
                      href={project.link}
                      className="text-blue-600 text-sm hover:underline inline-block mt-1"
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
