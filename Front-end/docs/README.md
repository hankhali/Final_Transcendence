# ft_transcendence - Person 1 Frontend

A TypeScript SPA (Single Page Application) for the ft_transcendence project, built with Vite and TypeScript.

## Features

- Pure TypeScript implementation (no React)
- SPA routing with browser history support
- Home, Register, and Tournament pages
- Form validation
- Loading/error states
- Responsive design

## Project Structure

```
Front-end/
├── assets/
│   └── images/              # Image assets (pic1-4.png)
├── public/                  # Public assets (vite.svg)
├── src/
│   ├── components/          # Reusable UI components
│   │   └── ProfileSettings.ts
│   ├── services/            # API and external services
│   │   └── api.ts
│   ├── styles/              # All CSS files
│   │   ├── style.css        # Main styles
│   │   ├── auth-forms.css
│   │   ├── profile-dropdown.css
│   │   └── profile-settings.css
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/               # Utility functions
│   │   └── helpers.ts
│   └── main.ts              # Application entry point
├── docs/                    # Documentation
├── dist/                    # Build output
├── index.html               # Main HTML file
└── config files             # package.json, tsconfig, etc.
```
├── index.html        # HTML entry point
├── vite.config.ts    # Vite configuration
├── tsconfig.json     # TypeScript configuration
└── package.json      # Project dependencies
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Requirements Met

This project fulfills the requirements for Person 1 as specified in the ft_transcendence checklist:
- Setup Vite + TypeScript SPA, project layout
- Home and Register pages (UI only)
- Form validation (alias, match)
- SPA routing (Back/Forward support)
- Tournament page layout
- Fake fetch logic with hardcoded JSON
- Loading/error states

## Notes

This implementation uses pure TypeScript without any frontend frameworks like React, adhering strictly to the TypeScript requirement.
