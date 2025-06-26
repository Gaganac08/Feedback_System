# 📋 Lightweight Feedback System

## 🚀 Project Overview

A lightweight internal feedback system designed for companies to facilitate ongoing feedback between managers and employees. This project enables structured, role-based feedback sharing and insight visualization via dashboards. It focuses on security, simplicity, and usability.

---

## 🧱 Tech Stack

| Layer      | Technology                                          |
| ---------- | --------------------------------------------------- |
| Frontend   | React + TypeScript + Tailwind CSS (via Vite)        |
| Backend    | FastAPI (Python)                                    |
| Database   | SQLite (for MVP)                                    |
| Auth       | Mocked authentication                               |
| Deployment | Vercel for frontend, Docker for backend           | 

---

## ✅ Core Features

### Authentication & Roles

* Two user roles: **Manager** and **Employee**
* Basic (mocked) login system with role-based access control
* Managers can see feedback of only their own team members

### Feedback Submission & Viewing

* Managers can submit structured feedback:

  * Strengths
  * Areas to Improve
  * Sentiment: Positive / Neutral / Negative
* Feedback history is visible to both the manager and the respective employee
* Managers can edit/update past feedback
* Employees can acknowledge feedback

### Dashboards

* **Manager Dashboard**: Team overview with feedback count and sentiment trends
* **Employee Dashboard**: Timeline view of received feedback

---

## ✨ Bonus Features Implemented

* \[Optional] Tagging of feedback with labels like "Leadership", "Communication", etc.
* \[Optional] Employees can request feedback proactively

---

## 🐳 Docker (Backend)

### 🧾 `Dockerfile`

```
# Dockerfile
FROM python:3.11

WORKDIR /app

COPY ./backend /app

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

```

### 🛠️ Run Instructions

```bash
# Step into backend folder (where Dockerfile is located)
cd backend

# Build the Docker image
docker build -t feedback-backend .

# Run the container
docker run -p 8000:8000 feedback-backend
```

API should now be running at `http://localhost:8000`.

---

## 💻 Local Setup (Frontend)

### Prerequisites

* Node.js + npm

### Commands

```bash
# Clone the project
cd feedback-teamwork-secure

# Install dependencies
npm install

# Run development server
npm run dev
```

Frontend will run at `http://localhost:5173`.

---

## 🔌 API Integration

The frontend communicates with the backend via RESTful APIs:

* `GET /feedback/:employee_id`
* `POST /feedback`
* `PUT /feedback/:feedback_id`
* `POST /acknowledge`

Ensure the frontend `.env` file contains:

```
VITE_API_URL=http://localhost:8000
```

---

## 🧠 Design Decisions

* Used FastAPI for speed, simplicity, and automatic Swagger docs
* Chose SQLite for easy local setup; can later switch to PostgreSQL
* Used TailwindCSS for rapid, responsive UI development
* Role-based rendering of dashboard components ensures clean separation

---

## 📦 Folder Structure (Frontend)

```
feedback-teamwork-secure/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/        # API integration
│   └── App.tsx
├── tailwind.config.ts
└── index.html
```

Backend will reside in `backend/` folder (to be added).

---

## 🧪 AI Tools Disclosure

We used GitHub Copilot and ChatGPT to assist in boilerplate code generation and planning. All generated code was reviewed and modified to meet the project’s unique requirements.

---

## 📽️ Deliverables

* ✅ Project Codebase (GitHub repo)
* ✅ [5-min Product Demo Video](#)
* ✅ [10-min Code Walkthrough Video](#)
* ✅ Dockerfile
* ✅ README (this file)

---

## 📌 Notes

* Public deployment (optional) not included; local run instructions provided
* Focused on core functionality + clean UI + secure role-based architecture

---

## 📊 Future Enhancements

* Real authentication using JWT
* Notification system (email or in-app)
* Export feedback as PDF
* Commenting and markdown support
* Peer-to-peer anonymous feedback

---

## 📞 Contact

If any queries arise, refer to the FAQ in the assignment PDF or the official submission form. All enhancements welcome!

---

> Made with 💙 to promote constructive feedback culture in teams.
