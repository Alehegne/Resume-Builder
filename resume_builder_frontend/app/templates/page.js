"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TEMPLATES } from "@/lib/templates";
import { useResume } from "@/hooks/useResume";
import Header from "@/components/layout/Header";

// Dummy data so previews render with realistic content
const PREVIEW_RESUME = {
  personal: { fullName: "Alex Johnson", email: "alex@example.com", phone: "+1 555 0100", address: "San Francisco, CA" },
  education: [{ degree: "B.Sc. Computer Science", fieldOfStudy: "CS", institution: "MIT", startDate: "2019-09-01", endDate: "2023-06-01" }],
  experience: [{ jobTitle: "Software Engineer", company: "Acme Corp", location: "Remote", startDate: "2023-01-01", endDate: "", description: "Built scalable web applications with React and Node.js." }],
  skills: [
    { name: "React", proficiency: 90 }, { name: "Node.js", proficiency: 80 },
    { name: "TypeScript", proficiency: 75 }, { name: "PHP", proficiency: 70 },
    { name: "MySQL", proficiency: 80 }, { name: "Git", proficiency: 85 },
  ],
  projects: [{ title: "Resume Builder", description: "Full-stack resume builder with multiple templates.", link: "#" }],
};

export default function TemplatesPage() {
  const router = useRouter();
  const { resume, selectTemplate } = useResume();
  const [selected, setSelected] = useState(resume.selectedTemplate || "modern");
  const [filter, setFilter]     = useState("All");

  const categories = ["All", ...new Set(TEMPLATES.map((t) => t.category))];
  const visible = filter === "All" ? TEMPLATES : TEMPLATES.filter((t) => t.category === filter);

  const handleUse = () => {
    selectTemplate(selected);
    router.push("/builder");
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Page header */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Choose a Template</h1>
              <p className="text-slate-500 mt-1 text-sm">Pick a design, then customise your resume in the builder.</p>
            </div>
            <button
              onClick={handleUse}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition text-sm shrink-0"
            >
              Use Selected → Builder
            </button>
          </div>

          {/* Category filter */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                  filter === cat
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-slate-200 text-slate-600 hover:border-blue-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Template grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {visible.map(({ id, name, description, component: Template, featured }) => {
              const isSelected = selected === id;
              return (
                <div
                  key={id}
                  onClick={() => setSelected(id)}
                  className={`group relative bg-white rounded-2xl border-2 cursor-pointer transition-all duration-200 overflow-hidden shadow-sm hover:shadow-lg ${
                    isSelected ? "border-blue-500 ring-2 ring-blue-200" : "border-slate-200 hover:border-blue-300"
                  }`}
                >
                  {/* Featured badge */}
                  {featured && (
                    <span className="absolute top-3 left-3 z-10 px-2 py-0.5 bg-amber-400 text-amber-900 text-xs font-bold rounded-full">
                      ★ Featured
                    </span>
                  )}

                  {/* Selected checkmark */}
                  {isSelected && (
                    <span className="absolute top-3 right-3 z-10 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">✓</span>
                  )}

                  {/* Live scaled preview */}
                  <div className="relative h-64 bg-slate-100 overflow-hidden">
                    <div
                      className="absolute top-0 left-0 origin-top-left pointer-events-none"
                      style={{ transform: "scale(0.36)", width: "278%", height: "278%" }}
                    >
                      <Template resume={PREVIEW_RESUME} />
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-colors duration-200" />
                  </div>

                  {/* Card footer */}
                  <div className="p-4 border-t border-slate-100">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-slate-900">{name}</h3>
                        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{description}</p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelected(id); selectTemplate(id); router.push("/builder"); }}
                      className={`mt-3 w-full py-2 rounded-lg text-sm font-semibold transition ${
                        isSelected
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                      }`}
                    >
                      {isSelected ? "✓ Selected — Go to Builder" : "Use Template"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
