"use client";

export default function TemplateCreative({ resume }) {
  const { personal = {}, education = [], experience = [], skills = [], projects = [] } = resume || {};

  return (
    <div id="resume-creative" className="w-full max-w-4xl mx-auto bg-white font-sans text-gray-900">
      {/* Header band */}
      <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 px-10 py-8 text-white">
        <div className="flex items-center gap-6">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-3xl font-black text-white shrink-0 border-2 border-white/40">
            {personal.fullName?.charAt(0)?.toUpperCase() || "?"}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-black tracking-tight truncate">{personal.fullName || "Your Name"}</h1>
            <p className="text-violet-200 font-semibold text-sm mt-0.5">Creative Professional</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-violet-100">
              {personal.email   && <span>✉ {personal.email}</span>}
              {personal.phone   && <span>📱 {personal.phone}</span>}
              {personal.address && <span>📍 {personal.address}</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_260px] gap-0">
        {/* ── Left column ── */}
        <div className="px-8 py-7 space-y-7 border-r border-gray-100">

          {/* Experience */}
          {experience.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-7 h-7 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center text-sm">💼</span>
                <h2 className="text-sm font-black uppercase tracking-widest text-gray-800">Experience</h2>
              </div>
              <div className="space-y-5">
                {experience.map((exp, i) => (
                  <div key={i} className="relative pl-4 border-l-2 border-violet-200">
                    <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-violet-500" />
                    <p className="font-bold text-gray-900">{exp.jobTitle}</p>
                    <p className="text-xs text-violet-600 font-semibold">{exp.company}{exp.location ? ` · ${exp.location}` : ""}</p>
                    <p className="text-xs text-gray-400 mb-1">{exp.startDate?.slice(0,7)} – {exp.endDate?.slice(0,7) || "Present"}</p>
                    {exp.description && <p className="text-sm text-gray-600 leading-relaxed">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm">🚀</span>
                <h2 className="text-sm font-black uppercase tracking-widest text-gray-800">Projects</h2>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {projects.map((p, i) => (
                  <div key={i} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-bold text-gray-900 text-sm">{p.title}</p>
                      {p.link && (
                        <a href={p.link} target="_blank" rel="noreferrer" className="text-xs text-violet-500 hover:underline shrink-0">↗ View</a>
                      )}
                    </div>
                    {p.description && <p className="text-xs text-gray-500 mt-1 leading-relaxed">{p.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-7 h-7 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center text-sm">🎓</span>
                <h2 className="text-sm font-black uppercase tracking-widest text-gray-800">Education</h2>
              </div>
              <div className="space-y-3">
                {education.map((edu, i) => (
                  <div key={i}>
                    <p className="font-bold text-gray-900 text-sm">{edu.degree}{edu.fieldOfStudy ? ` · ${edu.fieldOfStudy}` : ""}</p>
                    <p className="text-xs text-gray-500">{edu.institution} · {edu.startDate?.slice(0,4)}–{edu.endDate?.slice(0,4)}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* ── Right column ── */}
        <div className="px-6 py-7 space-y-7 bg-gray-50">
          {/* Skills as chips */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-3">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((s, i) => (
                  <span key={i} className="px-3 py-1 rounded-full text-xs font-semibold bg-violet-100 text-violet-700 border border-violet-200">
                    {s.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Skill bars */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-3">Proficiency</h2>
              <div className="space-y-2.5">
                {skills.slice(0, 6).map((s, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-700 font-medium">{s.name}</span>
                      <span className="text-gray-400">{s.proficiency ?? 70}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full" style={{ width: `${s.proficiency ?? 70}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
