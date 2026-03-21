🚀 Veda AI — AI-Powered Assignment Generator

🔗 Live Demo: https://veda-ai-self.vercel.app/
🔗 Backend API: https://veda-backend-sdxn.onrender.com

---

📌 Overview

Veda AI is a full-stack AI-powered platform that allows users to generate structured academic assignments dynamically.
Users can create assignments, generate questions using AI, and export them as downloadable PDFs — all in a seamless workflow.

---

✨ Features

- 🧠 AI Question Generation
  Generate structured assignments using AI

- 📝 Assignment Builder UI
  Create assignments with custom parameters (marks, question types, etc.)

- 📄 PDF Export
  Download generated assignments instantly

- 📊 Dashboard & Assignment Management
  View and manage all created assignments

- ⚡ Real-time API Integration
  Seamless frontend ↔ backend communication

- 🧱 Scalable Architecture
  Designed with queue-based processing support

---

🛠️ Tech Stack

Frontend

- Next.js (App Router)
- TypeScript
- Tailwind CSS

Backend

- Node.js
- Express.js
- TypeScript

Database

- MongoDB (Atlas)

Other Tools

- Render (Backend Deployment)
- Vercel (Frontend Deployment)
- GitHub (Version Control)

---

⚙️ Architecture

Frontend (Vercel)
        ↓
Backend API (Render)
        ↓
MongoDB + AI Service
        ↓
PDF Generation

---

🚀 Getting Started (Local Setup)

1. Clone the repository

git clone https://github.com/DISHA7-debug/Veda-AI.git
cd Veda-AI

---

2. Setup Backend

cd backend
npm install
npm run dev

Create a ".env" file:

MONGO_URI=your_mongodb_uri
OPENAI_API_KEY=your_api_key
PORT=5000

---

3. Setup Frontend

cd frontend
npm install
npm run dev

Create a ".env" file:

NEXT_PUBLIC_API_URL=http://localhost:5000

---

🌐 Deployment

- Frontend: Vercel
- Backend: Render

Environment variables are configured for production API connection.

---

🧠 Key Learnings

- Handling CORS issues in production environments
- Managing full-stack deployment (Vercel + Render)
- Building AI-integrated workflows
- Debugging real-world issues like:
  - Deployment failures
  - API connectivity
  - Environment configuration

---

📌 Future Improvements

- 🔄 Add authentication system
- 📱 Improve mobile responsiveness
- 📂 Save & categorize assignments
- ⚡ Optimize performance & caching

---

👤 Author

Disha Chopra
🔗 GitHub: https://github.com/DISHA7-debug

---

⭐ Show Your Support

If you like this project, give it a ⭐ on GitHub!
