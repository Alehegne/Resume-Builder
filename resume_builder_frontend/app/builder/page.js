"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
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
import { sendLogEvent } from "../../lib/utils";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function BuilderPage() {
  const resumeRef = useRef(null);
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const { saveResume, errors, resume } = useResume();
  const { toasts, addToast, removeToast } = useToast();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-500">Redirecting to login...</p>
      </div>
    );
  }

  const handlePrint = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: resume?.personal?.resumeTitle || "resume",

    onAfterPrint: () => {
      addToast("Resume downloaded successfully!", "success");

      sendLogEvent({
        user_id: user?.userId,
        category: "RESUME",
        level: "INFO",
        action: "RESUME_EXPORT",
        message: "Resume exported as PDF",
      });
    },
  });

  const handleSaveResume = async () => {
    try {
      await saveResume();
      // log user action
      const action = {
        user_id: user?.userId,
        action: "Resume saved",
      };
      sendLogEvent(action);
      addToast("Resume saved successfully!", "success");
    } catch (error) {
      console.log("errors:", errors);
      console.error("Error saving resume:", error);
      //       errors:
      // {resume: '', personal: '', education: 'Failed to save education', experience: '', skills: '', …}

      const errormessage =
        errors.save ||
        errors.personal ||
        errors.education ||
        errors.experience ||
        errors.skills ||
        errors.projects ||
        errors.resume ||
        "Unknown error";
      addToast(`Failed to save resume: ${errormessage}`, "error");
    }
  };

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
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-medium hover:cursor-pointer"
              >
                Create Resume
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-medium hover:cursor-pointer"
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
                  <div
                    className="scale-100 origin-top-left"
                    id="resume"
                    ref={resumeRef}
                  >
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
}
