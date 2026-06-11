# Resume Builder Backend

Pure PHP backend for the Resume Builder application. This service provides authentication, resume management, admin analytics, file uploads, and PDF generation for resume downloads.

## Overview

The backend is built without a PHP framework and follows a resource-oriented API structure. It uses PDO for MySQL access, and helper-driven request handling for responses, authentication, logging, and error management.

## Features

- User registration, login, logout, and profile management
- Resume creation, listing, updating, and deletion
- Personal info, project, education, work experience, and skills management
- Resume template selection and PDF download support
- Profile picture upload support
- Admin analytics and moderation endpoints
- Centralized logging and error handling

## Tech Stack

- PHP 7.4+
- MySQL
- PDO

## Project Structure

```text
ResumeBuilder_Backend/
├── .env.example
├── composer.json
├── README.md
├── src/
│   ├── api/
│   │   ├── admin/
│   │   ├── logs/
│   │   ├── resume/
│   │   ├── user/
│   │   └── work_experiance/
│   ├── config/
│   │   └── db.php
│   ├── controllers/
│   ├── helpers/
│   ├── migrations/
│   ├── models/
│   ├── seeders/
│   └── uploads/
├── storage/
├── uploads/
└── vendor/
```

## API Modules

### User

- `POST /src/api/user/register.php` - Register a new user account.
- `POST /src/api/user/login.php` - Authenticate a user and return an access token.
- `POST /src/api/user/logout.php` - Log out the current user and invalidate the token.
- `GET /src/api/user/profile.php` - Fetch the authenticated user's profile information.
- `PUT /src/api/user/profile-update.php` - Update the authenticated user's profile details.
- `POST /src/api/user/upload-profile-picture.php` - Upload and attach a profile picture to the user account.
- `GET /src/api/user/analytics.php` - Return user-related analytics data.
- `GET /src/api/user/visit_count.php` - Return visit count metrics.
- `GET /src/api/user/download_resume.php` - Download a resume file for the authenticated user.

### Resume

- `POST /src/api/resume/resume.php` - Create a new resume.
- `GET /src/api/resume/resume.php` - Retrieve one or more resumes for the authenticated user.
- `GET /src/api/resume/get.php` - Fetch a specific resume by ID.
- `PUT /src/api/resume/resume.php` - Update a resume's title or template.
- `DELETE /src/api/resume/resume.php` - Delete a resume.
- `POST /src/api/resume/personal_info.php` - Add or update personal information for a resume.
- `POST /src/api/resume/project.php` - Add or update a project entry for a resume.
- `GET /src/api/resume/education/index.php` - List education entries for a resume.
- `POST /src/api/resume/skills/add.php` - Add a skill entry to a resume.

### Work Experience

- `POST /src/api/work_experiance/add_work.php` - Add a work experience entry to a resume.
- Additional work experience handlers are organized under the same module folder.

### Admin

- `GET /src/api/admin/index.php?type=users` - List all users for admin review.
- `GET /src/api/admin/index.php?type=resumes` - List all resumes with user metadata.
- `GET /src/api/admin/index.php?type=dashboard` - Fetch dashboard analytics including totals, activity, and template usage.
- `GET /src/api/admin/settings.php` - Read the current application settings.
- `PUT /src/api/admin/settings.php` - Update application settings such as site title and maintenance mode.
- `DELETE /src/api/admin/resumes/delete.php` - Remove a resume from the admin panel.
- `POST /src/api/admin/users/deny.php` - Deny or block a user account.
- `POST /src/api/admin/users/restore.php` - Restore a previously denied user account.

### Logs

- `GET /src/api/logs/index.php` - Entry point for log-related access.
- `GET /src/api/logs/logs.php` - Retrieve paginated logs for admin users.
- `GET /src/api/logs/logs.php?metrics=1` - Return today's log metrics and activity summaries.
- `GET /src/api/logs/logs.php?download=1` - Download filtered logs as JSON or CSV.
- `GET /src/api/logs/logs.php?stream=1` - Stream log events in real time when supported by the client.

## Endpoint Summary

### Authentication and Profile

- `/src/api/user/register.php`
- `/src/api/user/login.php`
- `/src/api/user/logout.php`
- `/src/api/user/profile.php`
- `/src/api/user/profile-update.php`
- `/src/api/user/upload-profile-picture.php`

### Resume Content

- `/src/api/resume/resume.php`
- `/src/api/resume/get.php`
- `/src/api/resume/personal_info.php`
- `/src/api/resume/project.php`
- `/src/api/resume/education/index.php`
- `/src/api/resume/skills/add.php`
- `/src/api/work_experiance/add_work.php`

### Admin and Monitoring

- `/src/api/admin/index.php`
- `/src/api/admin/settings.php`
- `/src/api/admin/resumes/delete.php`
- `/src/api/admin/users/deny.php`
- `/src/api/admin/users/restore.php`
- `/src/api/logs/logs.php`

## Database Schema

The database is created and updated through the migration scripts in `src/migrations/`.

Tables include:

- `users`
- `resumes`
- `personal_info`
- `projects`
- `education`
- `work_experience`
- `skills`
- `logs`

## Available Admin Data Views

The admin endpoints currently expose the following data views:

- User list with role and profile fields
- Resume list joined with user names
- Dashboard metrics such as total users, total resumes, active users, recent activity, popular templates, and weekly resume creation counts
- Application settings persisted in a JSON file
- File-based log browsing, filtering, metrics, and export support

## Requirements

- PHP 7.4 or newer
- MySQL 8+ or compatible version
- PDO MySQL extension
- Web server such as Apache or Nginx

## Setup

1. Clone the repository.
2. Change into the backend directory.
3. Install dependencies with Composer.
4. Configure your database connection in `src/config/db.php`.
5. Create the database and run migrations.
6. Start your PHP web server or point your server document root to the project.

### Install Dependencies

```bash
composer install
```

### Environment Configuration

Copy `.env.example` to `.env` if you want to manage local environment values separately.

```bash
cp .env.example .env
```

### Database Migration

Run the migration bootstrap from the `src/migrations/` directory.

```bash
php src/migrations/run.php
```

## Configuration

Update the database connection values in `src/config/db.php` to match your local MySQL instance.

The included `.env.example` contains these keys for convenience:

```text
DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASS=
```

## Authentication

The backend uses token-based authentication. Protected endpoints expect an authorization token and return appropriate HTTP status codes when access is denied.

## Response Format

Most endpoints return JSON in a consistent format:

```json
{
  "code": 200,
  "success": true,
  "message": "Descriptive message",
  "data": {},
  "error": {}
}
```

## Security Practices

- Passwords are hashed before storage.
- Database queries use prepared statements with PDO.
- Authentication is token-based.
- File uploads are validated before being accepted.
- Error handlers avoid exposing sensitive internal details.
- Admin endpoints require administrator authentication.

## Admin Capabilities

The backend includes admin-oriented endpoints for:

- User analytics
- Resume analytics
- User moderation
- System monitoring data
- Security and activity tracking

## Development Notes

- The codebase uses a modular folder layout under `src/`.
- Helper functions are autoloaded from `src/helpers/`.
- Logging is handled through the `Logger` helper and the `logs` table.
- The repository includes both application data folders and runtime storage folders for uploaded files and generated artifacts.

## Useful Commands

```bash
php src/migrations/run.php
```

## Related Files

- [Database connection](src/config/db.php)
- [Migration bootstrap](src/migrations/run.php)
- [API endpoints](src/api/)

## License

No license has been specified for this repository.
