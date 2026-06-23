<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white" />
</p>

<h1 align="center">🤖 AI Resume Analyzer</h1>

<p align="center">
  <b>Upload your resume. Get your ATS score. Land more interviews.</b>
</p>

<p align="center">
  A modern full-stack web application that analyzes PDF resumes against ATS (Applicant Tracking System) standards, identifies skill gaps, detects missing sections, and provides actionable improvement suggestions — all in seconds.
</p>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 📄 **PDF Upload** | Drag-and-drop or click-to-browse with PDF validation and 5 MB limit |
| 📊 **ATS Score** | Weighted score (0–100) based on skill coverage, section completeness, and resume quality |
| ✅ **Skill Matching** | Matches 23 in-demand skills across 5 categories (Languages, Frontend, Backend, Databases, Tools) |
| 🔍 **Section Detection** | Detects Education, Skills, Projects, Experience, Certifications, and Achievements |
| 💪 **Strengths** | Intelligent strength analysis based on your resume content |
| ⚠️ **Weaknesses** | Identifies gaps and areas for improvement |
| 💡 **Smart Suggestions** | Priority-ranked, actionable recommendations customized to your resume |
| 🎨 **Premium UI** | Dark glassmorphism theme with smooth animations and responsive design |

---

## 🖥️ Screenshots

### Landing Page
> Hero section with animated gradient title, upload card with drag-and-drop zone, and a sleek dark theme.

### Results Dashboard
> Circular ATS score card, green/red skill badges, sections table, strengths & weaknesses cards, and priority-sorted suggestion cards.

---

## 🏗️ Tech Stack

### Frontend
- **React 19** — UI components
- **Vite 6** — Build tool & dev server
- **Tailwind CSS 3** — Utility-first styling
- **Axios** — HTTP requests

### Backend
- **Node.js** — Runtime
- **Express.js** — API framework
- **Multer** — File upload handling
- **pdf-parse** — PDF text extraction
- **CORS** — Cross-origin support

---

## 📁 Project Structure

```
ai-resume-analyzer/
│
├── client/                     # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Hero.jsx              # Hero section with gradient title
│   │   │   ├── UploadCard.jsx        # Drag & drop upload with validation
│   │   │   ├── ResultsDashboard.jsx  # Main results layout
│   │   │   ├── ScoreCard.jsx         # Animated circular ATS score
│   │   │   ├── SkillsBadges.jsx      # Matched & missing skill badges
│   │   │   ├── StrengthsWeaknesses.jsx
│   │   │   ├── Suggestions.jsx       # Priority-sorted recommendations
│   │   │   └── SectionsTable.jsx     # Resume sections Found/Missing
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css                 # Global styles & glassmorphism
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
├── server/                     # Backend (Express)
│   ├── uploads/                # Temporary upload directory (auto-cleaned)
│   ├── server.js               # Express server & API routes
│   ├── analyzer.js             # ATS analysis engine
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or later
- **npm** v9 or later

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/AnanthAkshay/ai-resume-analyzer.git
cd ai-resume-analyzer
```

**2. Install backend dependencies**

```bash
cd server
npm install
```

**3. Install frontend dependencies**

```bash
cd ../client
npm install
```

### Running the App

You need **two terminals** running simultaneously:

**Terminal 1 — Backend (port 5000)**

```bash
cd server
npm run dev
```

**Terminal 2 — Frontend (port 3000)**

```bash
cd client
npm run dev
```

Open **http://localhost:3000** in your browser.

---

## 📡 API Reference

### `POST /api/analyze`

Upload a PDF resume for analysis.

**Request**
- Content-Type: `multipart/form-data`
- Field: `resume` (PDF file, max 5 MB)

**Response**

```json
{
  "success": true,
  "fileName": "resume.pdf",
  "fileSize": 124500,
  "pages": 2,
  "score": 72,
  "matchedSkills": [
    { "skill": "python", "category": "languages" },
    { "skill": "react", "category": "frontend" }
  ],
  "missingSkills": [
    { "skill": "docker", "category": "tools" }
  ],
  "sections": {
    "education": true,
    "skills": true,
    "projects": true,
    "experience": false,
    "certifications": false,
    "achievements": false
  },
  "strengths": [
    "Good range of technical skills listed on the resume.",
    "Projects section is present — showcases hands-on experience."
  ],
  "weaknesses": [
    "Missing experience section — employers look for professional history.",
    "No certifications found — certifications can boost credibility."
  ],
  "suggestions": [
    {
      "title": "Earn and List Certifications",
      "description": "Add certifications like AWS Certified Cloud Practitioner...",
      "priority": "high"
    }
  ]
}
```

### `GET /api/health`

Health check endpoint. Returns `{ "status": "ok" }`.

---

## 📊 Scoring Algorithm

The ATS score is calculated from three weighted components:

| Component | Weight | What It Measures |
|-----------|--------|------------------|
| **Skill Coverage** | 60% | Percentage of tracked keywords found in the resume |
| **Section Completeness** | 20% | How many of 6 standard sections are detected |
| **Resume Quality** | 20% | Word count, contact info, profile links, category diversity |

**Tracked Skill Categories:**

| Category | Keywords |
|----------|----------|
| Languages | Java, Python, C, C++, JavaScript, TypeScript |
| Frontend | React, HTML, CSS, Tailwind, Bootstrap |
| Backend | Node, Express, Spring, REST API |
| Databases | MySQL, PostgreSQL, MongoDB |
| Tools | Git, GitHub, Docker, AWS |

---

## 🎨 Design Highlights

- **Dark glassmorphism** theme with frosted-glass cards
- **Animated background mesh** with radial gradient blobs
- **SVG circular score** with animated arc and counter
- **Staggered fade-in** animations on all list items
- **Color-coded badges** — green for matched, red for missing skills
- **Priority labels** on suggestions (High / Medium / Tip)
- **Fully responsive** — works on desktop, tablet, and mobile
- **Inter font** from Google Fonts for a clean, modern look

---

## 🛡️ Error Handling

| Scenario | Response |
|----------|----------|
| No file uploaded | `400` — "No file uploaded. Please select a PDF resume." |
| Non-PDF file | `400` — "Only PDF files are allowed." |
| File > 5 MB | `400` — "File size exceeds the 5 MB limit." |
| Empty / unreadable PDF | `400` — "The uploaded PDF appears to be empty or unreadable." |
| PDF parse failure | `500` — "Failed to parse the PDF." |

Uploaded files are **automatically deleted** after processing.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---
