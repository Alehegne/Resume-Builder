"use client";

import { TEMPLATES } from "@/lib/templates";

const PREVIEW_RESUME = {
  personal: { fullName: "Alex Johnson", email: "alex@example.com", phone: "+1 555 0100", address: "San Francisco, CA" },
  education: [{ degree: "B.Sc. Computer Science", fieldOfStudy: "CS", institution: "MIT", startDate: "2019-09-01", endDate: "2023-06-01" }],
  experience: [{ jobTitle: "Software Engineer", company: "Acme Corp", location: "Remote", startDate: "2023-01-01", endDate: "", description: "Built scalable web applications." }],
  skills: [
    { name: "React", proficiency: 90 }, { name: "Node.js", proficiency: 80 },
    { name: "TypeScript", proficiency: 75 }, { name: "PHP", proficiency: 70 },
  ],
  projects: [{ title: "Resume Builder", description: "Full-stack resume builder.", link: "#" }],
};

export default function TemplatesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Templates</h1>
        <p className="text-slate-500 text-sm mt-1">{TEMPLATES.length} templates available</p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        {TEMPLATES.map(({ id, name, description, component: Template, featured }) => (
          <div key={id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Live scaled preview */}
            <div className="relative h-64 bg-slate-100 overflow-hidden">
              {featured && (
                <span className="absolute top-2 left-2 z-10 px-2 py-0.5 bg-amber-400 text-amber-900 text-xs font-bold rounded-full">★ Featured</span>
              )}
              <div
                className="absolute top-0 left-0 origin-top-left pointer-events-none"
                style={{ transform: "scale(0.36)", width: "278%", height: "278%" }}
              >
                <Template resume={PREVIEW_RESUME} />
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 flex items-start justify-between gap-3">
              <div>
                <h2 className="font-bold text-slate-900">{name}</h2>
                <p className="text-xs text-slate-500 mt-0.5">{description}</p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />Active
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
