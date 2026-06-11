export const validators = {
  email: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  password: (password) => {
    return password && password.length >= 6;
  },

  required: (value) => {
    return value && value.trim() !== "";
  },

  phone: (phone) => {
    if (!phone) return true; // optional field
    const phoneRegex = /^[0-9\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, "").length >= 10;
  },

  url: (url) => {
    if (!url) return true; // optional field
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },
};

export const validateLoginForm = (email, password) => {
  const errors = {};

  if (!validators.required(email)) {
    errors.email = "Email is required";
  } else if (!validators.email(email)) {
    errors.email = "Invalid email format";
  }

  if (!validators.required(password)) {
    errors.password = "Password is required";
  } else if (!validators.password(password)) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};

export const validateSignupForm = (name, email, password, confirmPassword) => {
  const errors = {};

  if (!validators.required(name)) {
    errors.name = "Name is required";
  }

  if (!validators.required(email)) {
    errors.email = "Email is required";
  } else if (!validators.email(email)) {
    errors.email = "Invalid email format";
  }

  if (!validators.required(password)) {
    errors.password = "Password is required";
  } else if (!validators.password(password)) {
    errors.password = "Password must be at least 6 characters";
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

export const validatePersonalInfo = (personalInfo) => {
  const errors = {};

  if (!validators.required(personalInfo.fullName)) {
    errors.fullName = "Full name is required";
  }

  if (!validators.required(personalInfo.email)) {
    errors.email = "Email is required";
  } else if (!validators.email(personalInfo.email)) {
    errors.email = "Invalid email format";
  }

  if (personalInfo.phone && !validators.phone(personalInfo.phone)) {
    errors.phone = "Invalid phone number";
  }

  return errors;
};

export const validateEducation = (education) => {
  const errors = {};

  if (!validators.required(education.school)) {
    errors.school = "School/University is required";
  }

  if (!validators.required(education.degree)) {
    errors.degree = "Degree is required";
  }

  if (!validators.required(education.year)) {
    errors.year = "Graduation year is required";
  }

  return errors;
};

export const validateExperience = (experience) => {
  const errors = {};

  if (!validators.required(experience.jobTitle)) {
    errors.jobTitle = "Job title is required";
  }

  if (!validators.required(experience.company)) {
    errors.company = "Company is required";
  }

  if (!validators.required(experience.duration)) {
    errors.duration = "Duration is required";
  }

  return errors;
};
