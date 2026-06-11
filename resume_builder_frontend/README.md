# ResumeBuilder - Professional Resume Builder

A modern, full-featured resume builder application built with Next.js, React, and JavaScript. Create beautiful, professional resumes with real-time preview and PDF export.

## 👥 Group Members

| Roll Number | Group Members        | ID (ETS)       | GitHub Profile                                              |
| ----------- | -------------------- | -------------- | ----------------------------------------------------------- |
| 1           | **Ahlam Ahmed**      | **ETS0115/16** | [Ahlamv](https://github.com/Ahlamv)                         |
| 2           | **Alehegn Geta**     | **ETS0130/16** | [Alehegne](https://github.com/Alehegne)                     |
| 3           | **Amanawit Behailu** | **ETS0135/16** | [Amanawit22](http://github.com/Amanawit22)                  |
| 4           | **Amanuel Ayele**    | **ETS0140/16** | [Manu3lde](https://github.com/Manu3lde)                     |
| 5           | **Amanuel Getachew** | **ETS0147/16** | [Amanuel-Getachew-K](https://github.com/Amanuel-Getachew-K) |
| 6           | **Amanuel Habtamu**  | **ETS0148/16** | [AmananuelHab](https://github.com/AmanuelHab)               |


## Features

- **User Authentication**: Simple signup and login system
- **Split-Screen Editor**: Real-time preview of your resume as you edit
- **Multiple Templates**: Choose from Modern Professional or Minimal Professional templates
- **Dynamic Form Sections**:
  - Personal Information
  - Education (add multiple entries)
  - Work Experience (add multiple entries)
  - Skills (tag-based input)
  - Projects (with links and descriptions)
- **PDF Export**: Download your resume as a PDF file
- **Responsive Design**: Works on desktop and tablet devices
- **Professional Styling**: Clean, modern UI with TailwindCSS

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: JavaScript (ES6+)
- **Styling**: TailwindCSS v4
- **State Management**: React Context API
- **PDF Generation**: html2pdf.js
- **Form Handling**: Native HTML forms with custom validation

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (or npm/yarn)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd resume-builder
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
app/
├── page.js              # Landing page
├── login/page.js        # Login page
├── signup/page.js       # Signup page
├── builder/page.js      # Main resume builder
├── layout.tsx           # Root layout with providers
└── globals.css          # Global styles and theme

src/
├── components/
│   ├── auth/            # Authentication components
│   ├── forms/           # Form components (Personal, Education, etc.)
│   ├── templates/       # Resume templates
│   ├── resume/          # Resume preview component
│   ├── layout/          # Header and Footer
│   └── Providers.js     # Context providers
├── context/             # React Context for state management
├── hooks/               # Custom React hooks
└── utils/               # Utilities (validators, PDF export)
```

## Usage

### 1. Sign Up / Login
- Visit the home page and click "Get Started Free"
- Fill in your name, email, and password
- Or login if you already have an account

### 2. Build Your Resume
- Fill in your personal information
- Add your education background
- Add your work experience
- Add your professional skills
- Add any notable projects
- Choose your preferred resume template

### 3. Download
- Click the "Download PDF" button to export your resume

## Form Validation

All forms include validation for:
- Required fields
- Email format
- Password strength (minimum 6 characters)
- Phone number format
- URL format for project links

## Resume Templates

### Modern Professional
- Clean, modern design with clear section headers
- Organized layout with professional typography
- Perfect for traditional and creative roles

### Minimal Professional
- Minimalist design with elegant spacing
- Simplified typography
- Great for tech and creative industries

## Development

### Adding New Features

1. Create new components in `src/components/`
2. Use the existing context hooks for state management
3. Follow the naming conventions (PascalCase for components)
4. Add styles using TailwindCSS utility classes

### Form Validation

Add validation rules to `src/utils/validators.js`:
```javascript
export const validateYourField = (value) => {
  const errors = {};
  // Add validation logic
  return errors;
};
```

### Creating a New Template

Create a new template in `src/components/templates/`:
```javascript
export default function TemplateCustom({ resume }) {
  const { personal, education, experience, skills, projects } = resume;
  
  return (
    <div id="resume-custom">
      {/* Template markup */}
    </div>
  );
}
```

Then add it to the template selector in `TemplateSelector.js`.

## Authentication

Currently uses a mock authentication system. The auth state is managed through React Context and persists during the session.

For production, replace the mock functions in `src/context/AuthContext.js` with actual API calls to a backend service.

## Styling

The application uses TailwindCSS v4 with custom design tokens defined in `app/globals.css`:

- Primary Color: Blue (#3d82f6)
- Secondary Color: Warm Gray (#e8d5c4)
- Accent Color: Dark Gray (#1f2937)

Modify the color tokens to customize the theme globally.

## PDF Export

The PDF export uses html2pdf.js to convert the DOM to PDF. The export:
- Captures the resume-modern template
- Maintains styling and formatting
- Generates a downloadable PDF file

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- [ ] Cloud storage for resumes
- [ ] More template designs
- [ ] Drag-and-drop reordering of sections
- [ ] Cover letter builder
- [ ] Export to different formats (DOCX, etc.)
- [ ] AI-powered content suggestions
- [ ] Sharing and collaboration features

## License

MIT

## Support

For issues, questions, or suggestions, please open an issue in the repository.
# resume_builder_frontend_next_js
