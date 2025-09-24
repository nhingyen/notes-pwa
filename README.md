# Notes App

Ứng dụng ghi chú Progressive Web App (PWA) được xây dựng bằng React, hỗ trợ Markdown và hoạt động offline.

## Features

- Create, edit, delete notes with user-friendly interface
- Markdown support with real-time preview
- Search notes by title and content
- Progressive Web App - install like native app
- Offline functionality - local data storage
- Responsive design - optimized for mobile and desktop

## Tech Stack

- Frontend: React 18, Hooks, Context API
- Styling: CSS3, Flexbox, Grid, Responsive Design
- PWA: Service Worker, Web App Manifest
- Storage: localStorage API
- Markdown: react-markdown
- Build: Create React App, Webpack
- Deploy: Netlify

# Installation

Clone repository

```
git clone https://github.com/your-username/notes-pwa.git
cd notes-pwa
```

Install dependencies

```
npm install
```

Run development server

```
npm start
```

Open http://localhost:3000 to view the application.

Production build:

```
# Create optimized build
npm run build

# Preview build locally
npm install -g serve
serve -s build -p 3000
```

## Authors

- Nhi Nguyen
- GitHub: @nhingyen
- Email: yennhing.work@gmail.com
