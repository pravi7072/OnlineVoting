# Online Voting System

A full-stack web application for secure and user-friendly online voting, built with **React**, **TypeScript**, **Vite**, **Express.js**, **Prisma**, and **PostgreSQL**. The system supports user authentication, election management, and result viewing, featuring a seamless, responsive frontend and a modular backend API.

---

## 🚀 Features

- 🔐 User Authentication & Registration
- 🗳️ Manage and participate in Elections
- 📄 View detailed election results
- 🎯 RESTful API with backend validation
- 💡 Modern UI with React + Tailwind (or CSS Modules)
- 📦 Modular, monorepo-friendly folder structure with reusable types

---

## 📁 Folder Structure

OnlineVoting/
│
├── backend/ # Node.js + Express backend
│ ├── src/
│ │ ├── routes/ # Route definitions (auth, election)
│ │ │ ├── auth.ts
│ │ │ └── election.ts
│ │ └── index.ts # Backend entry point
│ ├── prisma/ # Prisma schema and migrations (if used)
│ ├── .env # Backend environment variables
│ ├── package.json
│ └── tsconfig.json
│
├── frontend/ # React + Vite + TypeScript frontend
│ ├── src/
│ │ ├── components/ # Navbar, etc.
│ │ ├── pages/ # Login, Register, Election, Results, etc.
│ │ ├── App.tsx # Main application component/router
│ │ ├── index.tsx # React entry point
│ │ └── styles/ # App.css, main.css (if any)
│ ├── public/ # Static assets
│ ├── package.json
│ ├── vite.config.ts
│ └── tsconfig.json
│
├── .gitignore
└── README.md



---

## ⚙️ Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | React, TypeScript, Vite           |
| Backend   | Node.js, Express.js, Prisma ORM*  |
| Database  | PostgreSQL (or mock, for demo)    |
| Styling   | Tailwind CSS / CSS Modules        |
| Auth      | JWT or Session (custom, as per code) |

_\* Omit Prisma if you're not using ORM — adjust as needed._

---

## 🧑‍💻 Getting Started

### 1. Clone the Repository

git clone <your-repo-url>
cd OnlineVoting


---

### 2. Backend Setup

cd backend
npm install



- Set environment variables in `.env` file:
  - `DATABASE_URL`: Your database connection string
  - `JWT_SECRET`: Your JWT secret key

- (If using Prisma)
npx prisma generate
npx prisma migrate dev --name init



- Start the backend server:

npm run dev



---

### 3. Frontend Setup

cd ../frontend
npm install
npm run dev



---

## 🌐 API Endpoints (Sample)

| Method | Endpoint              | Description                        |
|--------|-----------------------|------------------------------------|
| POST   | `/api/v1/user/`       | User registration & login          |
| GET    | `/api/v1/elections/`  | List all elections                 |
| GET    | `/api/v1/elections/:id` | Get details of a specific election |
| POST   | `/api/v1/elections/:id/vote` | Submit a vote                |
| GET    | `/api/v1/results/:id` | View election results              |

---

## 🗳️ Main Pages (Frontend)

- `/` – Home page
- `/login` – User login
- `/register` – Create new account
- `/elections` – List and browse available elections
- `/elections/:id` – View and participate in a specific election
- `/results/:id` – View results of a specific election

---

## 🤝 Contributing

Contributions and feedback are welcome!  
Please open issues or submit PRs to improve or extend functionality.

---

**Happy Voting! 🗳️**

---
