"use client";

import { backendUrl } from "@/utils/constants";
import { getAuthHeaders } from "@/context/AuthContext";
import React, { createContext, useState, useCallback } from "react";

export const ResumeContext = createContext();

const initialResume = {
  id: "",
  personal: {
    fullName: "Yeshwork Geta",
    email: "yeshwork.geta@example.com",
    phone: "+251912345678",
    address: "Addis Ababa, Ethiopia",
    photoUrl: null,
    resumeTitle: "Software Engineer Resume",
  },
  education: [
    {
      id: "edu_1",
      institution: "Addis Ababa University",
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Science",
      startDate: "2019-09-01",
      endDate: "2023-07-01",
      description:
        "Focused on software engineering, data structures, and database systems.",
    },
    {
      id: "edu_2",
      institution: "Coursera",
      degree: "Professional Certificate",
      fieldOfStudy: "Backend Development",
      startDate: "2023-08-01",
      endDate: "2024-02-01",
      description:
        "Completed courses on APIs, authentication, and system design.",
    },
  ],
  experience: [
    {
      id: "exp_1",
      jobTitle: "Backend Developer Intern",
      company: "Tech Solutions PLC",
      location: "Addis Ababa",
      startDate: "2023-06-01",
      endDate: "2023-12-01",
      description:
        "Built REST APIs using PHP and MySQL, implemented authentication and improved query performance.",
    },
    {
      id: "exp_2",
      jobTitle: "Freelance Web Developer",
      company: "Self-employed",
      location: "Remote",
      startDate: "2024-01-01",
      endDate: "2024-06-01",
      description:
        "Developed full-stack applications using Next.js, MongoDB, and Node.js for small businesses.",
    },
  ],
  skills: [
    {
      name: "JavaScript",
      proficiency: 80,
    },
    {
      name: "PHP",
      proficiency: 70,
    },
    {
      name: "Node.js",
      proficiency: 85,
    },
    {
      name: "MongoDB",
      proficiency: 75,
    },
    {
      name: "MySQL",
      proficiency: 80,
    },
    {
      name: "React",
      proficiency: 85,
    },
    {
      name: "Next.js",
      proficiency: 80,
    },
    {
      name: "Git",
      proficiency: 70,
    },
  ],
  projects: [
    {
      id: "proj_1",
      title: "LocalMed",
      description:
        "A SaaS platform for local clinics to manage bookings and patient records.",
      link: "https://github.com/yeshwork/localmed",
    },
    {
      id: "proj_2",
      title: "Task Manager API",
      description:
        "A RESTful API built with raw PHP and MySQL supporting authentication and CRUD operations.",
      link: "https://github.com/yeshwork/task-manager-api",
    },
  ],
  selectedTemplate: "modern",
};
export function ResumeProvider({ children }) {
  const [resume, setResume] = useState(initialResume);
  const [errors, setErrors] = useState({
    resume: "",
    personal: "",
    education: "",
    experience: "",
    skills: "",
    projects: "",
    save: "",
  });

  const getUserId = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user ? user.userId : null;
  };

  //create resume with temaplate name and resume titile
  const saveResume = useCallback(async () => {
    console.log("Saving resume:", resume);
    try {
      // const response = await fetch(`${backendUrl}/resume/save_resume.php`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(resume),
      // });

      // if (!response.ok) {
      //   throw new Error("Failed to save resume");
      // }

      // const data = await response.json();
      // console.log("Resume saved successfully:", data);
      // return data;
      const createUrl = `${backendUrl}/resume/resume.php`;
      const personalUrl = `${backendUrl}/resume/personal_info.php`;
      const projectUrl = `${backendUrl}/resume/project.php`;
      const experienceUrl = `${backendUrl}/work_experiance/add_work.php`;
      const skillUrl = `${backendUrl}/resume/skills/add.php`;
      const educationUrl = `${backendUrl}/resume/education/index.php`;

      // Get authentication headers
      const authHeaders = getAuthHeaders();

      // Create resume
      console.log("User Id:", getUserId());
      const createResponse = await fetch(createUrl, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({
          title: resume.personal.resumeTitle,
          template: resume.selectedTemplate,
          user_id: getUserId(),
        }),
      });
      if (!createResponse.ok) {
        setErrors((prev) => ({
          ...prev,
          resume: "Failed to create resume, provide a title and template",
          save: "Failed to save resume",
        }));
        throw new Error("Failed to create resume");
      }
      const createData = await createResponse.json();
      console.log("Create response for resume creation:", createData);
      const resumeId = createData.data.id;
      console.log("Step one Done:", createData);

      //step 2:- save personal info
      const personalResponse = await fetch(personalUrl, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({
          resume_id: resumeId,
          full_name: resume.personal.fullName,
          email: resume.personal.email,
          phone: resume.personal.phone,
          address: resume.personal.address,
          photo_url: resume.personal.photoUrl,
        }),
      });
      if (!personalResponse.ok) {
        setErrors((prev) => ({
          ...prev,
          personal:
            "Failed to save personal info, ensure all required fields are filled",
          save: "Failed to save resume",
        }));
        throw new Error("Failed to save personal info");
      }
      console.log("Step two Done:", await personalResponse.json());

      //step 3:- save projects
      console.log("Saving projects:", resume.projects, "resumeId:", resumeId);
      const projectResponse = await fetch(projectUrl, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({
          resume_id: resumeId,
          projects: resume.projects,
        }),
      });

      if (!projectResponse.ok) {
        setErrors((prev) => ({ ...prev, projects: "Failed to save project" }));
        throw new Error("Failed to save project");
      }
      console.log("Step three Done: Projects saved");

      //step 4:- experiance
      console.log(
        "Saving experience:",
        resume.experience,
        "resumeId:",
        resumeId,
      );
      const experianceResponse = await fetch(experienceUrl, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({
          resume_id: resumeId,
          experience: resume.experience,
        }),
      });

      if (!experianceResponse.ok) {
        setErrors((prev) => ({
          ...prev,
          experience: "Failed to save experience",
        }));
        throw new Error("Failed to save experience");
      }

      //step 5:- skills
      console.log("Saving skills:", resume.skills, "resumeId:", resumeId);
      const skillResponse = await fetch(skillUrl, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({
          resume_id: resumeId,
          skills: resume.skills,
        }),
      });

      if (!skillResponse.ok) {
        setErrors((prev) => ({ ...prev, skills: "Failed to save skill" }));
        throw new Error("Failed to save skill");
      }

      //step 6:- education
      console.log("Saving education:", resume.education, "resumeId:", resumeId);
      const educationResponse = await fetch(educationUrl, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({
          resume_id: resumeId,
          education: resume.education,
        }),
      });

      if (!educationResponse.ok) {
        setErrors((prev) => ({
          ...prev,
          education: "Failed to save education",
        }));

        throw new Error("Failed to save education");
      }

      console.log("Resume saved successfully");
      return { success: true };
    } catch (error) {
      console.error("Error saving resume:", error);
      throw error;
    }
  }, [resume]);

  const updateResume = useCallback(
    async (resumeId) => {
      try {
        const resumeUrl = `${backendUrl}/resume/resume.php`;
        const personalUrl = `${backendUrl}/resume/personal_info.php`;
        const projectUrl = `${backendUrl}/resume/project.php`;
        const experienceUrl = `${backendUrl}/work_experiance/add_work.php`;
        const skillUrl = `${backendUrl}/resume/skills/add.php`;
        const educationUrl = `${backendUrl}/resume/education/index.php`;
        const authHeaders = getAuthHeaders();

        console.log("Updating resume:", resumeId);

        // STEP 1 — UPDATE MAIN RESUME

        const resumeResponse = await fetch(resumeUrl, {
          method: "PUT",
          headers: authHeaders,
          body: JSON.stringify({
            resume_id: resumeId,
            title: resume.personal.resumeTitle,
            template: resume.selectedTemplate,
          }),
        });

        if (!resumeResponse.ok) {
          setErrors((prev) => ({
            ...prev,
            resume: "Failed to update resume",
            save: "Failed to update resume",
          }));

          throw new Error("Failed to update resume");
        }

        console.log("Resume updated");

        // STEP 2 — UPDATE PERSONAL INFO

        const personalResponse = await fetch(personalUrl, {
          method: "PUT",
          headers: authHeaders,
          body: JSON.stringify({
            resume_id: resumeId,
            full_name: resume.personal.fullName,
            email: resume.personal.email,
            phone: resume.personal.phone,
            address: resume.personal.address,
            photo_url: resume.personal.photoUrl,
          }),
        });

        if (!personalResponse.ok) {
          setErrors((prev) => ({
            ...prev,
            personal: "Failed to update personal info",
            save: "Failed to update resume",
          }));

          throw new Error("Failed to update personal info");
        }

        console.log("Personal updated");

        // STEP 3 — UPDATE PROJECTS

        const projectResponse = await fetch(projectUrl, {
          method: "PUT",
          headers: authHeaders,
          body: JSON.stringify({
            resume_id: resumeId,
            projects: resume.projects,
          }),
        });

        if (!projectResponse.ok) {
          setErrors((prev) => ({
            ...prev,
            projects: "Failed to update projects",
          }));

          throw new Error("Failed to update projects");
        }

        console.log("Projects updated");

        // STEP 4 — UPDATE EXPERIENCE

        const experienceResponse = await fetch(experienceUrl, {
          method: "PUT",
          headers: authHeaders,
          body: JSON.stringify({
            resume_id: resumeId,
            experience: resume.experience,
          }),
        });

        if (!experienceResponse.ok) {
          setErrors((prev) => ({
            ...prev,
            experience: "Failed to update experience",
          }));

          throw new Error("Failed to update experience");
        }

        console.log("Experience updated");

        // STEP 5 — UPDATE SKILLS

        const skillResponse = await fetch(skillUrl, {
          method: "PUT",
          headers: authHeaders,
          body: JSON.stringify({
            resume_id: resumeId,
            skills: resume.skills,
          }),
        });

        if (!skillResponse.ok) {
          setErrors((prev) => ({
            ...prev,
            skills: "Failed to update skills",
          }));

          throw new Error("Failed to update skills");
        }

        console.log("Skills updated");

        // STEP 6 — UPDATE EDUCATION

        const educationResponse = await fetch(educationUrl, {
          method: "PUT",
          headers: authHeaders,
          body: JSON.stringify({
            resume_id: resumeId,
            education: resume.education,
          }),
        });

        if (!educationResponse.ok) {
          setErrors((prev) => ({
            ...prev,
            education: "Failed to update education",
          }));

          throw new Error("Failed to update education");
        }

        console.log("Education updated");

        return {
          success: true,
        };
      } catch (error) {
        console.error("Error updating resume:", error);

        throw error;
      }
    },
    [resume],
  );

  const updatePersonal = useCallback((personalData) => {
    setResume((prev) => ({
      ...prev,
      personal: { ...prev.personal, ...personalData },
    }));
  }, []);

  const addEducation = useCallback((education) => {
    setResume((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { id: Date.now().toString(), ...education },
      ],
    }));
  }, []);

  const updateEducation = useCallback((id, education) => {
    setResume((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, ...education } : edu,
      ),
    }));
  }, []);

  const deleteEducation = useCallback((id) => {
    setResume((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  }, []);

  const addExperience = useCallback((experience) => {
    setResume((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        { id: Date.now().toString(), ...experience },
      ],
    }));
  }, []);

  const updateExperience = useCallback((id, experience) => {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, ...experience } : exp,
      ),
    }));
  }, []);

  const deleteExperience = useCallback((id) => {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  }, []);

  const addSkill = useCallback((skill) => {
    if (!skill) return;

    const newSkill =
      typeof skill === "string" ? { name: skill, proficiency: 50 } : skill;

    setResume((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }));
  }, []);

  const deleteSkill = useCallback((skillName) => {
    setResume((prev) => ({
      ...prev,
      skills: prev.skills.filter(
        (skill) => skill.name.toLowerCase() !== skillName.toLowerCase(),
      ),
    }));
  }, []);

  const addProject = useCallback((project) => {
    setResume((prev) => ({
      ...prev,
      projects: [...prev.projects, { id: Date.now().toString(), ...project }],
    }));
  }, []);

  const updateProject = useCallback((id, project) => {
    setResume((prev) => ({
      ...prev,
      projects: prev.projects.map((proj) =>
        proj.id === id ? { ...proj, ...project } : proj,
      ),
    }));
  }, []);

  const deleteProject = useCallback((id) => {
    setResume((prev) => ({
      ...prev,
      projects: prev.projects.filter((proj) => proj.id !== id),
    }));
  }, []);

  const selectTemplate = useCallback((template) => {
    setResume((prev) => ({
      ...prev,
      selectedTemplate: template,
    }));
  }, []);

  const resetResume = useCallback(() => {
    setResume(initialResume);
  }, []);

  //load resume by id and set to context
  const loadResume = useCallback(async (resumeId) => {
    try {
      const userId = getUserId();
      const res = await fetch(
        `http://localhost:8000/api/resume/resume.php?resume_id=${resumeId}&user_id=${userId}`,
        {
          method: "GET",
          headers: getAuthHeaders(),
        },
      );
      if (!res.ok) {
        throw new Error("Failed to load resume");
      }
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message || "Error loading resume");
      }
      console.log("Resume loaded successfully:", data);
      setResume(data.data);
    } catch (error) {
      console.error("Error loading resume:", error);
      setErrors((prev) => ({ ...prev, resume: "Failed to load resume" }));
      // Re-throw so callers (pages/components) can react and show user-visible errors
      throw error;
    }
  }, []);

  const value = {
    resume,
    updatePersonal,
    addEducation,
    updateEducation,
    deleteEducation,
    addExperience,
    updateExperience,
    deleteExperience,
    addSkill,
    deleteSkill,
    addProject,
    updateProject,
    deleteProject,
    selectTemplate,
    resetResume,
    saveResume,
    errors,
    loadResume,
    updateResume,
  };

  return (
    <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
  );
}
