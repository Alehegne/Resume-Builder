"use client";

import { useState } from "react";
import { useResume } from "@/hooks/useResume";
import { validatePersonalInfo } from "@/utils/validators";

export default function PersonalInfoForm() {
  const { resume, updatePersonal } = useResume();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...resume.personal, [name]: value };
    updatePersonal(updatedData);

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = () => {
    const validationErrors = validatePersonalInfo(resume.personal);
    setErrors(validationErrors);
  };

  return (
    <div className="bg-card p-6 rounded-lg border border-border">
      <h2 className="text-2xl font-bold text-foreground mb-6">
        Personal Information
      </h2>
      {/* title of the resume to save it with the name */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-2">
          Resume Title(for saving purpose)
        </label>
        <input
          type="text"
          name="resumeTitle"
          value={resume.personal.resumeTitle}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition"
          placeholder="Software Engineer Resume"
        />
      </div>
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Full Name *
          </label>
          <input
            type="text"
            name="fullName"
            value={resume.personal.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition ${
              errors.fullName ? "border-destructive" : "border-border"
            }`}
            placeholder="John Doe"
          />
          {errors.fullName && (
            <p className="text-sm text-destructive mt-1">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={resume.personal.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition ${
              errors.email ? "border-destructive" : "border-border"
            }`}
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="text-sm text-destructive mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={resume.personal.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition ${
              errors.phone ? "border-destructive" : "border-border"
            }`}
            placeholder="+1 (555) 000-0000"
          />
          {errors.phone && (
            <p className="text-sm text-destructive mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={resume.personal.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition"
            placeholder="City, State"
          />
        </div>
      </div>
    </div>
  );
}
