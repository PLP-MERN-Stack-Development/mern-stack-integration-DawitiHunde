# MERN Blog — Full Stack Application

## Project Overview
This is a full-stack MERN blog application demonstrating integrated features:
- Posts CRUD (create, read, update, delete)
- Categories and comments
- User authentication (register & login with JWT)
- Image uploads for posts
- Pagination, search, filter
- Optimistic UI updates and client-side caching

## Tech stack
- Backend: Node.js, Express.js, Mongoose, Joi, Multer, JWT
- Frontend: React (Vite), Tailwind CSS, Axios, React Router
- Database: MongoDB (Atlas or local)

## Repository layout
(see repository root layout)

## Setup

### Prerequisites
- Node.js v18+
- MongoDB (Atlas or local)

### Server
```bash
cd server
cp .env.example .env
# edit .env to add your MONGO_URI and JWT_SECRET
npm install
npm run dev
