"use client";
import React from "react";
import TemplateModern from "@/components/templates/TemplateModern";
import TemplateMinimal from "@/components/templates/TemplateMinimal";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast, ToastContainer } from "@/components/ui/Toast";

import Header from "@/components/layout/Header";
import PersonalInfoForm from "@/components/forms/PersonalInfoForm";
import EducationForm from "@/components/forms/EducationForm";
import ExperienceForm from "@/components/forms/ExperienceForm";
import SkillsForm from "@/components/forms/SkillsForm";
import ProjectsForm from "@/components/forms/ProjectsForm";
import TemplateSelector from "@/components/templates/TemplateSelector";
import ResumePreview from "@/components/resume/ResumePreview";
import { useResume } from "@/hooks/useResume";
import { sendLogEvent } from "../../../../lib/utils";

const templates = {
  modern: TemplateModern,
  minimal: TemplateMinimal,
};

const EditResume = () => {
  const [userId, setUserId] = React.useState(null);

  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const { resume, loadResume, updateResume } = useResume();
  const { user, isAuthenticated } = useAuth();
  const { toasts, addToast, removeToast } = useToast();

  const params = useParams();
  const resumeId = params.id;

  React.useEffect(() => {
    if (!user || !isAuthenticated) {
      window.location.href = "/login";
      return;
    }
    setUserId(user.userId);
  }, [user, isAuthenticated]);

  useEffect(() => {
    if (!userId) return;

    const fetchResume = async () => {
      try {
        setIsLoading(true);
        await loadResume(resumeId);
      } catch (err) {
        const msg = err?.message || "Failed to load resume";
        setError(msg);
        addToast(msg, "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchResume();
  }, [userId, resumeId, loadResume]);

  if (isLoading) {
    return <div className="text-center text-gray-500">Loading resume...</div>;
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto bg-red-100 text-red-600 p-4 rounded mb-6">
        {error}
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="text-center text-gray-500">
        Resume not found. Please go back and select a valid resume.
      </div>
    );
  }

  const handleSaveResume = async () => {
    try {
      await updateResume(resumeId);
      //log action
      const action = {
        user_id: user?.userId,
        action: "resume Edited",
      };
      sendLogEvent(action);
      addToast("Resume updated successfully!", "success");
    } catch (err) {
      const msg = err?.message || "Error updating resume";
      addToast(msg, "error");
      console.error("Error updating resume:", err);
    }
  };
  const handleDownloadPDF = async () => {};
  const SelectedTemplate = templates[resume.selectedTemplate] || TemplateModern;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-foreground">
              Resume Builder
            </h1>
            <div className="space-x-4">
              <button
                onClick={handleSaveResume}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-medium"
              >
                Save Resume
              </button>

              <button
                type="button"
                onClick={handleDownloadPDF}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-medium"
              >
                Download PDF
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="space-y-6 order-2 lg:order-1">
              <PersonalInfoForm />
              <EducationForm />
              <ExperienceForm />
              <SkillsForm />
              <ProjectsForm />
              <TemplateSelector />
            </div>

            {/* Preview Section */}
            <div className="order-1 lg:order-2">
              <div className="sticky top-24 bg-card rounded-lg p-4 border border-border shadow-lg">
                <h2 className="text-lg font-bold text-foreground mb-4">
                  Preview
                </h2>
                <div className="rounded-md overflow-hidden border border-border">
                  <div className="scale-100 origin-top-left">
                    <ResumePreview />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </>
  );
};

export default EditResume;
