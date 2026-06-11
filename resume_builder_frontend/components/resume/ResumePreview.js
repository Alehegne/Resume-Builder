'use client';

import { useResume } from '@/hooks/useResume';
import { getTemplate } from '@/lib/templates';

export default function ResumePreview() {
  const { resume } = useResume();
  const Template = getTemplate(resume.selectedTemplate);

  return (
    <div className="bg-white rounded-lg p-8 overflow-y-auto max-h-screen">
      <Template resume={resume} />
    </div>
  );
}
