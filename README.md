# 📧 Email CRUD Auth App

A full-stack Email Management application built with:

- ⚛️ React (Frontend)
- 🟢 Node.js + Express (Backend)
- 🐘 PostgreSQL (Database)
- 🐳 Docker & Docker Compose
- 🔐 JWT Authentication

This project demonstrates containerized full-stack architecture with Docker and environment-based configuration.

---

## 🚀 Features

- User registration & login (JWT authentication)
- Password hashing with bcrypt
- Create, read, delete emails
- Protected routes
- PostgreSQL relational schema
- Dockerized multi-service setup

---

## 🏗️ Architecture

Browser  
⬇  
React (Nginx container)  
⬇  
Node.js Backend  
⬇  
PostgreSQL  

All services run inside Docker containers.

---

## 🐳 Run The Project With Docker (Recommended)

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/email-crud-auth.git
cd email-crud-auth


## Build and start containers

docker compose up --build
