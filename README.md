# 💼 JobGenius — Premium Job Portal

[![Live Demo](https://img.shields.io/badge/Demo-Live%20Link-blueviolet?style=for-the-badge&logo=vercel)](https://jobportal-peach-ten.vercel.app/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.0-646CFF?style=for-the-badge&logo=vite)](https://vite.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

**JobGenius** is a modern, high-performance job portal application designed to bridge the gap between recruiters and job seekers. Built using a robust React + Vite stack and styled with Tailwind CSS & DaisyUI, it features clean aesthetics, real-time chats, video calls, and a responsive experience.

🔗 **Live Deployment:** [https://jobportal-peach-ten.vercel.app/](https://jobportal-peach-ten.vercel.app/)

---

## ✨ Features

- **Double-Sided Portal**: Separate user journeys and dashboards for **Job Seekers** and **Recruiters**.
- **Real-Time Messaging**: Built-in chat system powered by **Stream Chat SDK** to discuss job applications.
- **In-App Video Calling**: Seamless, high-quality video interviews enabled by **Stream Video React SDK**.
- **Job Postings & Search**: Recruiters can post, manage, and end drives. Job seekers can browse, search, and apply to job listings.
- **AI-Driven Job Suggestions**: Algorithmic job recommendations tailored to user profiles.
- **Application Tracking**: Live tracking of application status (Shortlisted, Applied, etc.).
- **Dynamic Profile Management**: Interactive form control to set up resumes, work experience, profiles, and avatars.

---

## 🛠️ Tech Stack

- **Frontend Core**: React 19, React Router v7, Redux Toolkit
- **Build Tooling**: Vite 7, ESLint
- **Styling**: Tailwind CSS v4, DaisyUI v5, Lucide React
- **Communications**: `@stream-io/video-react-sdk`, `stream-chat-react`, `stream-chat`
- **API Client**: Axios

---

## ⚙️ Configuration & Environment Variables

The project uses environment variables to avoid hardcoded credentials. To configure your keys, copy the template and configure the variables:

1. Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and fill in your keys:
   ```env
   # API Backend Base URL
   VITE_API_BASE_URL=https://final-year-project-backend-0q17.onrender.com/api

   # GetStream API Key for Chat and Video calls
   VITE_STREAM_API_KEY=dnc52adyqvqk
   ```

> [!NOTE]  
> The `.env` file is excluded from git commits by default in `.gitignore` to protect your credentials.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have **Node.js** (v18+) and **npm** installed on your system.

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
The application will be running locally at `http://localhost:5173`.

### 3. Build for Production
To bundle the application for production:
```bash
npm run build
```
This generates optimized static files in the `dist` folder, which can be deployed to Vercel, Netlify, GitHub Pages, or any static hosting platform.

---

## 📄 License

This project is open-source. Feel free to clone, modify, and use it for your portfolios!
