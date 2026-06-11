'use client';

import { useResume } from '@/hooks/useResume';
import { TEMPLATES } from '@/lib/templates';

export default function TemplateSelector() {
  const { resume, selectTemplate } = useResume();

  return (
    <div className="bg-card p-6 rounded-lg border border-border">
      <h2 className="text-2xl font-bold text-foreground mb-6">Resume Template</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {TEMPLATES.map(({ id, name, description }) => (
          <button
            key={id}
            onClick={() => selectTemplate(id)}
            className={`p-4 border-2 rounded-lg transition text-left ${
              resume.selectedTemplate === id
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <h3 className="font-bold text-foreground mb-1">{name}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
