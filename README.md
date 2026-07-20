# Professional Resume Builder 🚀

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Frontend](https://img.shields.io/badge/Frontend-Next.js%2016-black?logo=next.js)
![Backend](https://img.shields.io/badge/Backend-PHP%20%7C%20MySQL-777BB4?logo=php)
![Styling](https://img.shields.io/badge/Styling-TailwindCSS%20v4-38B2AC?logo=tailwind-css)

A modern, full-stack resume builder application designed to help users create, manage, and download professional resumes effortlessly. It features a Next.js (App Router) frontend with real-time preview and a secure, pure PHP backend handling data persistence, authentication, and PDF generation.

---

## 📖 Table of Contents

- [Project Overview](#-project-overview)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [System Architecture](#-system-architecture)
- [Technology Stack](#-technology-stack)
- [Folder Structure](#-folder-structure)
- [Installation & Setup](#-installation--setup)
- [Application Workflow](#-application-workflow)
- [Security Features](#-security-features)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Project Overview

Resume Builder is a split-screen web application that enables users to input their professional details (education, experience, skills, and projects) and see a real-time preview of their formatted resume. Users can choose between multiple professional templates, securely save their data, and export their final resume as a PDF. 

The project demonstrates a decoupled architecture where a React-based frontend seamlessly communicates with a RESTful API built entirely in pure PHP.

---

## ✨ Features

### User Management
- Secure user registration and login (JWT/Token-based authentication).
- Profile management, including uploading profile pictures.
- Session persistence and secure logouts.

### Resume Builder
- **Real-Time Preview:** Split-screen editor allowing users to see layout changes instantly.
- **Dynamic Form Sections:** Add, edit, or delete entries for Education, Work Experience, Skills, and Projects.
- **Multiple Templates:** Choose from Modern Professional or Minimalist templates.
- **Save & Manage:** Save multiple resumes to your account and manage them via a personal dashboard.

### PDF Export
- High-quality client-side PDF export utilizing `html2pdf.js`, preserving exact styling and formatting.

### Admin Features
- Admin dashboard to view user analytics, monitor system logs, and manage (view, delete, restore) user accounts and resumes.

---

## 📸 Screenshots

*(Replace these placeholders with actual screenshots of the application)*

| Dashboard | Split-Screen Builder |
| :---: | :---: |
| ![Dashboard Placeholder](https://via.placeholder.com/400x250?text=User+Dashboard) | ![Builder Placeholder](https://via.placeholder.com/400x250?text=Resume+Builder) |

| Login Page | PDF Export |
| :---: | :---: |
| ![Login Placeholder](https://via.placeholder.com/400x250?text=Login+Page) | ![PDF Placeholder](https://via.placeholder.com/400x250?text=PDF+Export) |

---

## 🏗️ System Architecture

The application relies on a decoupled Client-Server architecture:

1. **Frontend (Client):** A Next.js application that renders the UI, manages application state using React Context API, and communicates with the backend via RESTful API calls. 
2. **Backend (Server):** A PHP-based REST API that processes client requests, enforces business logic, handles user authentication, and interacts with the database.
3. **Database:** A MySQL relational database accessed via PDO (PHP Data Objects) for secure, prepared statement interactions.

Detailed architectural and API documentation can be found in the repository:
- [Architecture Overview](./ARCHITECTURE.md)
- [API Documentation](./API_DOCUMENTATION.md)

---

## 💻 Technology Stack

### Frontend
- **Framework:** Next.js 16 (App Router)
- **Language:** JavaScript (ES6+)
- **Styling:** TailwindCSS v4
- **State Management:** React Context API
- **UI Components:** Radix UI, Lucide React
- **PDF Generation:** html2pdf.js

### Backend
- **Language:** PHP 7.4+ (Pure PHP, no frameworks)
- **Database:** MySQL
- **Database Access:** PDO (PHP Data Objects)
- **PDF Generation:** TCPDF (Server-side alternative/support)
- **Architecture:** Custom MVC-inspired structure (Models, API Controllers, Helpers)

---

## 📂 Folder Structure

```text
resume_builder/
├── resume_builder_frontend/       # Next.js Application
│   ├── app/                       # Next.js App Router (Pages, Layouts)
│   ├── components/                # Reusable React components (Auth, Forms, UI, Templates)
│   ├── context/                   # React Context Providers (AuthContext, ResumeContext)
│   ├── hooks/                     # Custom React Hooks
│   ├── lib/                       # API Client & utilities
│   └── utils/                     # Validators and PDF export logic
│
└── ResumeBuilder_Backend/         # PHP Backend Application
    ├── src/
    │   ├── api/                   # Public REST API Endpoints (User, Resume, Admin)
    │   ├── config/                # Database and environment configurations
    │   ├── helpers/               # Utility functions (Response formatting, Auth, etc.)
    │   ├── models/                # Database interaction models (User, Resume, Education, etc.)
    │   └── vendor/                # Composer dependencies (TCPDF, etc.)
    ├── .env.example               # Environment variables template
    └── composer.json              # Backend dependencies
```

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js:** v18+
- **Package Manager:** pnpm, npm, or yarn
- **PHP:** v7.4+
- **Web Server:** Apache or Nginx
- **Database:** MySQL v5.7+
- **Composer:** For PHP dependencies

### 1. Database Setup
1. Create a MySQL database (e.g., `resume_builder_db`).
2. The necessary tables will be created via the backend schema or migrations (ensure you have imported the schema if provided).

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd ResumeBuilder_Backend
   ```
2. Install PHP dependencies:
   ```bash
   composer install
   ```
3. Configure environment variables:
   - Copy `.env.example` to `.env`.
   - Update your database credentials and application settings in `.env`.
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=your_password
   DB_NAME=resume_builder_db
   ```
4. Start your PHP development server or configure your web server (Apache/Nginx) to point to the backend directory.
   ```bash
   php -S localhost:8000 -t src/
   ```

### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd resume_builder_frontend
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Update API endpoints if necessary in `utils/constants.js` or `lib/apiClient.js` to point to your local PHP server (e.g., `http://localhost:8000/api`).
4. Start the Next.js development server:
   ```bash
   pnpm dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔄 Application Workflow

1. **Onboarding:** Users sign up with their email and password. Passwords are securely hashed via bcrypt.
2. **Dashboard:** Upon login, users are presented with their saved resumes. They can create a new resume or edit an existing one.
3. **Data Entry:** Users navigate through form sections (Personal Info, Experience, Education) to build their profile. The state is centrally managed via `ResumeContext`.
4. **Real-time Synchronization:** Changes made in the UI update the React context and the live preview immediately.
5. **Persistence:** When the user clicks save, the frontend `apiClient` sends a POST/PUT request to the PHP backend with the authentication token.
6. **Export:** Users generate a PDF directly from their browser, preserving the HTML/CSS template visually.

---

## 🛡️ Security Features

- **Authentication:** Token-based authentication used for securing API requests.
- **Password Hashing:** Passwords are mathematically hashed using PHP's native `password_hash()` (bcrypt).
- **SQL Injection Prevention:** All database queries utilize PDO Prepared Statements.
- **Cross-Origin Resource Sharing (CORS):** Backend headers strictly control origin access to prevent unauthorized domain requests.
- **Data Validation:** Both frontend and backend implement rigorous input validation.

---

## 🤝 Contributing

Contributions are welcome! If you would like to contribute:
1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add some amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the MIT License.