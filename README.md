# 📝 Clutter – Marketplace Practice Repository

> ⚠️ **Educational Purpose** – A functional marketplace application built to master resource ownership, dynamic filtering, and secure full-stack patterns.

**Clutter** is a lightweight marketplace (Lalafo-like) where users can post items for sale, browse products by categories, and manage their listings with strict access control.

---

## 🎯 Learning Objectives & Goals

- **Resource Ownership:** Implementing server-side checks to ensure only the product owner can delete their listings (verified via Auth middleware).
- **Relational Data:** Linking `Products` to `Users` (Sellers) and `Categories` using Mongoose `ref`.
- **Advanced API Routing:** Building a modular router structure with specialized controllers for Products, Users, and Categories.
- **Secure Sessions:** Stateless authentication using **JWT** and high-security password hashing with **Argon2**.

## 🛠 Tech Stack

- **Frontend:** React, TypeScript, Vite, Redux Toolkit, Framer Motion
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB
- **Security:** Argon2 (hashing), JWT (session tokens)
- **File Handling:** Multer (for product image uploads)

## 🏗 Architecture & Best Practices

- **Service-Controller Pattern:** Business logic is isolated from routes for better maintainability.
- **FSD (Feature-Sliced Design):** Frontend organized into scalable layers (`entities`, `shared`, `widgets`).
- **Middleware Integration:** - `auth`: Validates tokens and protects sensitive operations.
    - `imagesUpload`: Handles `multipart/form-data` for product photos.

## 📡 API Documentation

All base routes are prefixed with `/api`.

### 👤 User Management
- `POST /users/register` — Create a new account.
- `POST /users/login` — Authenticate and receive a token.
- `DELETE /users/logout` — Securely terminate session (**Auth required**).

### 📦 Products
- `GET /products` — Get all products (supports category filtering).
- `GET /products/:id` — Get detailed info about a single product.
- `POST /products` — Create a new listing with image upload (**Auth required**).
- `DELETE /products/:id` — Remove a listing (**Owner only**).

### 🏷 Categories
- `GET /categories` — Fetch the list of available categories for navigation.

## 🚀 Launch & Installation

### 1. Requirements
Ensure you have a `.env` file in the `backend` folder:
```env
JWT_SECRET=''
```

### 2. Run Backend (API)

```bash
cd backend

npm install

npm run dev
```

### 3. Run Frontend

```bash
cd frontend

npm install

npm run dev
```