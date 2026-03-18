# DoConnect

A full stack Question and Answer platform built with the MERN stack. Users can ask questions, post answers, like and comment on answers, and chat in real time. Admins moderate all content through an approval workflow.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Prerequisites](#prerequisites)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Running the App](#running-the-app)
- [Running Tests](#running-tests)
- [API Reference](#api-reference)
- [Notes](#notes)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Database | MongoDB + Mongoose |
| Backend | Node.js + Express.js |
| Frontend | React.js (Create React App) |
| Real-Time | Socket.io |
| Auth | JWT + bcryptjs |
| Email | Nodemailer |
| UI | React-Bootstrap |
| Testing (Backend) | Mocha + Chai + Supertest |
| Testing (Frontend) | Jest + React Testing Library |
| Testing (E2E) | Cypress |

---

## Folder Structure

```
doconnect/
│
├── doconnect-backend/
│   ├── server.js
│   ├── .env
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── Role.js
│   │   ├── Status.js
│   │   ├── User.js
│   │   ├── Question.js
│   │   ├── Answer.js
│   │   ├── Like.js
│   │   ├── Comment.js
│   │   └── Message.js
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── seeders/
│   │   └── seedLookups.js
│   └── tests/
│       ├── 00_setup.test.js
│       ├── auth.test.js
│       ├── questions.test.js
│       ├── answers.test.js
│       └── admin.test.js
│
└── doconnect-frontend/
    └── src/
        ├── components/
        ├── pages/
        ├── services/
        ├── context/
        ├── utils/
        └── tests/
```

---

## Prerequisites

Make sure the following are installed on your system before starting:

- [Node.js](https://nodejs.org/) v18 or later
- [MongoDB](https://www.mongodb.com/) running locally on port `27017`
- npm (comes with Node.js)

Verify your installation:

```bash
node -v
npm -v
```

---

## Backend Setup

### 1. Navigate to the backend folder

```bash
cd doconnect-backend
```

### 2. Install dependencies

```bash
npm install
```

If dependencies do not install automatically, run the following manually:

```bash
# Production dependencies
npm install express bcryptjs cors dotenv jsonwebtoken mongoose nodemailer socket.io

# Development dependencies
npm install --save-dev nodemon mocha chai supertest cross-env
```

### 3. Create the `.env` file

Create a `.env` file in the root of `doconnect-backend/` and add the following:

```env
MONGO_URI=mongodb://localhost:27017/doconnect
PORT=5000
JWT_SECRET=doconnect_jwt_secret_key
JWT_EXPIRE=7d

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

> **Gmail note:** Use an App Password, not your regular Gmail password. Go to **Google Account → Security → 2-Step Verification → App Passwords** to generate one.

### 4. Seed the database (first time only)

The project uses lookup tables for Roles and Status. Run this once before starting:

```bash
node seeders/seedLookups.js
```

This inserts the following records:

| Table | ID | Value |
|-------|----|-------|
| Roles | 1 | user |
| Roles | 2 | admin |
| Status | 1 | approved |
| Status | 2 | pending |
| Status | 3 | rejected |

---

## Frontend Setup

### 1. Navigate to the frontend folder

```bash
cd doconnect-frontend
```

### 2. Install dependencies

```bash
npm install
```

If any dependency is missing, install individually:

```bash
npm install react-router-dom axios react-bootstrap bootstrap socket.io-client
```

---

## Running the App

### Start the backend

```bash
cd doconnect-backend
npm run dev
```

Backend runs on `http://localhost:5000`

You should see:

```
MongoDB Connected
Server running on port 5000
```

### Start the frontend

Open a new terminal:

```bash
cd doconnect-frontend
npm start
```

Frontend runs on `http://localhost:3000`

> Make sure the backend is running before starting the frontend.

---

## Running Tests

### Backend tests (Mocha + Chai + Supertest)

Tests run on a **separate test database** (`doconnect_test`). Your real data is never affected.

```bash
cd doconnect-backend
npm test
```

Expected result: **30 tests passing**

### Frontend unit tests (Jest + React Testing Library)

```bash
cd doconnect-frontend
npm test
```

Test files:

```
src/tests/Login.test.js
src/tests/Register.test.js
src/tests/QuestionCard.test.js
```

### End-to-end tests (Cypress)

Make sure both backend and frontend are running first, then:

```bash
cd doconnect-frontend
npx cypress open
```

Select **E2E Testing**, choose a browser, then run:

```
cypress/e2e/doconnect.cy.js
```

---

## API Reference

All routes are prefixed with `/api`. Base URL: `http://localhost:5000/api`

### Auth

| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| POST | `/auth/register` | Public | Register new user |
| POST | `/auth/login` | Public | Login and receive JWT token |
| POST | `/auth/logout` | Protected | Logout |

### Questions

| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| GET | `/questions` | Public | Get all approved questions |
| POST | `/questions` | Protected | Create a question |
| GET | `/questions/search?keyword=` | Public | Search by keyword |
| PUT | `/questions/:id/approve` | Admin | Approve a question |
| PUT | `/questions/:id/reject` | Admin | Reject a question |
| PUT | `/questions/:id/close` | Admin | Close a thread |
| DELETE | `/questions/:id` | Admin | Delete a question |

### Answers

| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| GET | `/answers/:questionId` | Public | Get approved answers |
| POST | `/answers/:questionId` | Protected | Post an answer |
| PUT | `/answers/:id/approve` | Admin | Approve an answer |
| PUT | `/answers/:id/reject` | Admin | Reject an answer |
| DELETE | `/answers/:id` | Admin | Delete an answer |

### Likes & Comments

| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| POST | `/likes/:answerId` | Protected | Like an answer |
| DELETE | `/likes/:answerId` | Protected | Unlike an answer |
| GET | `/comments/:answerId` | Public | Get comments |
| POST | `/comments/:answerId` | Protected | Add a comment |
| DELETE | `/comments/:commentId` | Protected | Delete own comment |

### Messages

| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| GET | `/messages/:otherUserId` | Protected | Get chat history |
| POST | `/messages` | Protected | Send a message |

### Admin

| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| GET | `/admin/users` | Admin | Get all users |
| PUT | `/admin/users/:id/deactivate` | Admin | Deactivate a user |
| PUT | `/admin/users/:id/activate` | Admin | Activate a user |
| PUT | `/admin/users/:id/promote` | Admin | Promote user to admin |
| PUT | `/admin/users/:id/demote` | Admin | Demote admin to user |
| GET | `/admin/questions` | Admin | Get all questions including pending |
| GET | `/admin/answers` | Admin | Get all answers including pending |

> **Protected routes** require `Authorization: Bearer <token>` in the request header.
> **Admin routes** require the user to have `roleId: 2`.

---

## Notes

- Lookup tables (Roles and Status) **must be seeded** before the first run
- All new questions and answers start as **pending** and are only visible after admin approval
- Socket.io handles real-time one-to-one messaging between users
- Email notifications are sent to the admin when a new question or answer is submitted
- If you run into dependency issues, try a clean reinstall:

```bash
rm -rf node_modules
npm install
```
