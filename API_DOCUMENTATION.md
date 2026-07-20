# API Documentation

This document outlines the RESTful API endpoints provided by the Resume Builder PHP Backend. The API allows the Next.js frontend to securely handle user authentication, manage resume data, and perform administrative tasks.

## Base URL
All API endpoints are relative to the base URL of your PHP server. Assuming local development:
```
http://localhost:8000/api
```

## Authentication
The API utilizes Token-based authentication. 
For endpoints that require authorization, the client must include the JWT/Auth Token in the HTTP headers:
```http
Authorization: Bearer <your_token_here>
```

## Response Format
All API responses return JSON with a consistent structure:

**Success Response Example:**
```json
{
  "code": 200,
  "success": true,
  "message": "Descriptive success message",
  "data": { ... } 
}
```

**Error Response Example:**
```json
{
  "code": 400,
  "success": false,
  "message": "Descriptive error message"
}
```

---

## 1. User Authentication Endpoints

### 1.1 Register User
- **URL:** `/user/register.php`
- **Method:** `POST`
- **Description:** Registers a new user account.
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Responses:**
  - `201 Created`: User successfully registered.
  - `400 Bad Request`: Validation error or email already exists.

### 1.2 Login User
- **URL:** `/user/login.php`
- **Method:** `POST`
- **Description:** Authenticates a user and returns their profile and token.
- **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Responses:**
  - `200 OK`: Login successful. Returns `data` containing user info and token.
  - `401 Unauthorized`: Invalid credentials.

### 1.3 Logout User
- **URL:** `/user/logout.php`
- **Method:** `POST`
- **Auth Required:** Yes
- **Description:** Invalidates the current user session/token.
- **Responses:**
  - `200 OK`: Successfully logged out.

### 1.4 Get Profile
- **URL:** `/user/profile.php`
- **Method:** `GET`
- **Auth Required:** Yes
- **Description:** Retrieves the authenticated user's profile information.

### 1.5 Update Profile
- **URL:** `/user/profile-update.php`
- **Method:** `PUT`
- **Auth Required:** Yes
- **Description:** Updates user profile details.
- **Request Body:**
  ```json
  {
    "name": "Johnathan Doe",
    "email": "johnathan@example.com"
  }
  ```

### 1.6 Upload Profile Picture
- **URL:** `/user/upload-profile-picture.php`
- **Method:** `POST`
- **Auth Required:** Yes
- **Content-Type:** `multipart/form-data`
- **Description:** Uploads a user profile picture. Expects a file input named `profile_picture`.

---

## 2. Resume Management Endpoints

### 2.1 Get All User Resumes
- **URL:** `/resume/get.php?user_id={id}`
- **Method:** `GET`
- **Auth Required:** Yes
- **Description:** Fetches all resumes (including deeply nested education, skills, projects, and work experience) belonging to a specific user.

### 2.2 Create / Update / Delete Resume Details
- **URL:** `/resume/resume.php`
- **Auth Required:** Yes
- **Methods:**
  - **POST**: Create a new base resume.
    ```json
    { "user_id": 1, "title": "Software Engineer Resume", "template": "modern" }
    ```
  - **PUT**: Update resume metadata (requires `resume_id` in body or query).
  - **DELETE**: Delete a specific resume.

---

## 3. Resume Sections Endpoints

For all section endpoints, the resume must belong to the authenticated user.

### 3.1 Personal Information
- **URL:** `/resume/personal_info.php`
- **Methods:**
  - **POST**: Add personal info to a resume.
  - **PUT**: Update personal info.
  - **DELETE**: Delete personal info.
- **Expected Data:** `resume_id`, `full_name`, `email`, `phone`, `address`.

### 3.2 Education
- **URL:** `/resume/education/index.php`
- **Methods:**
  - **POST**: Add an education entry.
  - **PUT**: Update an education entry.
  - **DELETE**: Delete an education entry.
- **Expected Data:** `resume_id`, `institution`, `degree`, `field_of_study`, `start_date`, `end_date`.

### 3.3 Work Experience
- **URL:** `/resume/work_experiance/index.php`
- **Methods:**
  - **POST**: Add a work experience entry.
  - **PUT**: Update a work experience entry.
  - **DELETE**: Delete a work experience entry.
- **Expected Data:** `resume_id`, `company`, `position`, `start_date`, `end_date`, `description`.

### 3.4 Skills
- **URL:** `/resume/skills/add.php`
- **Methods:**
  - **POST**: Add a new skill.
  - **PUT**: Update skill proficiency or name.
  - **DELETE**: Remove a skill.
- **Expected Data:** `resume_id`, `skill_name`, `proficiency`.

### 3.5 Projects
- **URL:** `/resume/project.php`
- **Methods:**
  - **POST**: Add a new project entry.
  - **PUT**: Update a project entry.
  - **DELETE**: Remove a project entry.
- **Expected Data:** `resume_id`, `title`, `description`, `link`.

---

## 4. Admin and Analytics Endpoints

*Note: These endpoints require administrative authorization.*

### 4.1 Admin Analytics Overview
- **URL:** `/admin/index.php`
- **Method:** `GET`
- **Description:** Returns high-level platform statistics (total users, total resumes created, etc.).

### 4.2 Application Settings
- **URL:** `/admin/settings.php`
- **Methods:**
  - **GET**: Retrieve global application settings.
  - **PUT**: Update settings.

### 4.3 User Administration
- **URL:** `/admin/users/deny.php` & `/admin/users/restore.php`
- **Methods:** `POST`, `DELETE`
- **Description:** Allow administrators to ban, restore, or completely delete user accounts from the platform.

### 4.4 System Logs
- **URL:** `/logs/logs.php`
- **Method:** `GET`
- **Description:** Retrieve system activity logs for auditing and monitoring.

---

## Status Codes

| Code | Description | Meaning |
| :--- | :--- | :--- |
| `200` | OK | Request succeeded. |
| `201` | Created | Resource successfully created. |
| `400` | Bad Request | Invalid input parameters or missing fields. |
| `401` | Unauthorized | Missing or invalid authentication token. |
| `403` | Forbidden | User does not have permission to perform this action. |
| `404` | Not Found | The requested resource (e.g., Resume ID) does not exist. |
| `500` | Internal Server Error | Server-side exception or database error. |
