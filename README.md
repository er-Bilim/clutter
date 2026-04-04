# 📝 Clutter – Practice Repository

> ⚠️ **This is an educational repository** This code is written solely for practice and to explore technologies

A simple REST API application **Clutter**. Each user can register, log in.

## 🛠 Tech Stack

- **Frontend:** React, TypeScript, Vite, Redux Toolkit
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB
- **Security:** Argon2 for password hashing, JWT for generate token

## 🏗 Architecture & Best Practices

This project follows a clean separation of concerns:
- **Backend:** Service-Controller pattern to keep business logic out of routes
- **Frontend:** Principles of Feature-Sliced Design (FSD) for scalable and maintainable code
- **API:** Consistent status codes (`200`, `201`, `400`, `404`, `500`) and centralized error handling

## ⚙️ Features

- **Auth:** Secure registration and login flow
- **Marketplace:** Browse items by categories, view detailed seller info
- **Ownership:** Users can only manage (delete) items they have created
- **UX:** Loading states (spinners), error notifications

## 🚀 Launch

### Backend (API)

Start the server

```bash
npm install

npm run dev
```

### Frontend

```bash
npm install

npm run dev
```