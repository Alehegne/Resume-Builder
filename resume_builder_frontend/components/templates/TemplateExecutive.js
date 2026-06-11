"use client";

function Section({ title }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-900 whitespace-nowrap">{title}</h2>
      <div className="flex-1 h-px bg-gray-300" />
    </div>
  );
}

export default function TemplateExecutive({ resume }) {
  const { personal = {}, education = [], experience = [], skills = [], projects = [] } = resume || {};

  return (
    <div id="resume-executive" className="w-full max-w-4xl mx-auto bg-white font-serif text-gray-900">
      {/* Header */}
      <div className="px-12 pt-10 pb-6 border-b-2 border-gray-900">
        <h1 className="text-4xl font-black tracking-tight text-gray-900 uppercase">
          {personal.fullName || "Your Name"}
        </h1>
        <div className="flex flex-wrap gap-x-6 gap-y-1 mt-2 text-xs text-gray-500 font-sans">
          {personal.email   && <span>{personal.email}</span>}
          {personal.phone   && <span>{personal.phone}</span>}
          {personal.address && <span>{personal.address}</span>}
        </div>
      </div>

      <div className="px-12 py-8 space-y-8">

        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <Section title="Professional Experience" />
            <div className="space-y-6">
              {experience.map((exp, i) => (
                <div key={i} className="grid grid-cols-[1fr_auto] gap-4">
                  <div>
                    <p className="font-black text-gray-900 text-sm uppercase tracking-wide">{exp.jobTitle}</p>
                    <p className="text-sm text-gray-600 font-sans font-semibold">{exp.company}{exp.location ? `, ${exp.location}` : ""}</p>
                    {exp.description && <p className="text-sm text-gray-600 font-sans mt-1.5 leading-relaxed">{exp.description}</p>}
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-gray-400 font-sans whitespace-nowrap">
                      {exp.startDate?.slice(0,7)} – {exp.endDate?.slice(0,7) || "Present"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section>
            <Section title="Education" />
            <div className="space-y-4">
              {education.map((edu, i) => (
                <div key={i} className="grid grid-cols-[1fr_auto] gap-4">
                  <div>
                    <p className="font-black text-gray-900 text-sm uppercase tracking-wide">{edu.degree}{edu.fieldOfStudy ? ` — ${edu.fieldOfStudy}` : ""}</p>
                    <p className="text-sm text-gray-600 font-sans">{edu.institution}</p>
                  </div>
                  <p className="text-xs text-gray-400 font-sans whitespace-nowrap shrink-0">
                    {edu.startDate?.slice(0,4)} – {edu.endDate?.slice(0,4)}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <Section title="Core Competencies" />
            <div className="flex flex-wrap gap-x-6 gap-y-1">
              {skills.map((s, i) => (
                <span key={i} className="text-sm text-gray-700 font-sans">
                  {s.name}{i < skills.length - 1 ? " ·" : ""}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <Section title="Selected Projects" />
            <div className="space-y-4">
              {projects.map((p, i) => (
                <div key={i}>
                  <div className="flex items-baseline gap-3">
                    <p className="font-black text-gray-900 text-sm uppercase tracking-wide">{p.title}</p>
                    {p.link && <a href={p.link} target="_blank" rel="noreferrer" className="text-xs text-gray-400 font-sans hover:text-gray-700">{p.link}</a>}
                  </div>
                  {p.description && <p className="text-sm text-gray-600 font-sans mt-1 leading-relaxed">{p.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
