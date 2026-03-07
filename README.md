# 📧 Email CRUD Auth App

A full-stack Email Management application built with:

- ⚛️ React (Frontend)
- 🟢 Node.js + Express (Backend)
- 🐘 PostgreSQL (Database)
- 🐳 Docker & Docker Compose
- 🔐 JWT Authentication
- 📊 Prometheus + Grafana (Monitoring)

This project demonstrates containerized full-stack architecture with Docker, environment-based configuration, and **production-grade observability**.

---

## 🚀 Features

- User registration & login (JWT authentication)
- Password hashing with bcrypt
- Create, read, delete emails
- Protected routes
- PostgreSQL relational schema
- Dockerized multi-service setup
- Real-time monitoring with Prometheus & Grafana

---

## 🏗️ Architecture
```
Browser
  ⬇
React (Nginx container)  →  port 3000
  ⬇
Node.js Backend          →  port 5000
  ⬇
PostgreSQL               →  port 5432
```

All services run inside Docker containers on a shared `email_network`.

---

## 📊 Monitoring Stack

While working on this project I started wondering — how does a developer actually see what's happening inside their application in production? We focus so much on making things work locally, but once it's deployed we're blind.

So I added **Prometheus** and **Grafana** to the stack.

### Prometheus scrapes metrics from:
- **Backend container** — request rates, errors, and health checks
- **cAdvisor** — container CPU, memory, and network usage
- **Node Exporter** — host Ubuntu OS metrics

### Grafana visualizes:
- `GET /health 200` 🔵 — app is alive
- `POST /login 500` 🔴 — authentication failures
- `POST /register 400` 🟢 — bad requests

### Why this matters:

| Without Monitoring | With Monitoring |
|---|---|
| CPU above 80%? You guess | You see it and scale |
| Memory growing? You find out when it crashes | You add resources proactively |
| Something broke in production? You dig through logs | You see the exact moment it failed |

> **My advice:** Don't wait for something to break before you start monitoring. Add observability from day one. A simple stack with Prometheus and Grafana running locally taught me more about my application than any log file ever did.

---

## 🐳 Run With Docker (Recommended)

### 1️⃣ Clone the repository
```bash
git clone https://github.com/aminebouhaik/email-crud-auth.git
cd email-crud-auth
```

### 2️⃣ Start all services
```bash
docker compose up --build
```

---

## 🌐 Service URLs

| Service | URL |
|---|---|
| 🌐 Frontend | http://localhost:3000 |
| 🔧 Backend API | http://localhost:5000 |
| ❤️ Health Check | http://localhost:5000/health |
| 📊 Prometheus | http://localhost:9090 |
| 📈 Grafana | http://localhost:3001 |

> Grafana default login: `admin` / `admin`

---

## ⚙️ CI/CD Pipeline

This project uses **GitHub Actions** with a self-hosted runner to automatically:

1. Build and push Docker images to DockerHub on every push to `main`
2. Deploy only app services (`backend`, `frontend`) without touching monitoring
3. Verify deployment by polling `/health` with retries up to 60 seconds
4. Update monitoring services only when Prometheus/Grafana configs change

---

## 🗂️ Project Structure
```
email-crud-auth/
├── backend/          # Node.js + Express API
│   ├── dockerfile
│   ├── server.js
│   └── init.sql
├── client/           # React + Nginx
│   ├── dockerfile
│   └── nginx.conf
├── prometheus/
│   └── prometheus.yml
├── docker-compose.yaml
└── .github/
    └── workflows/
        └── full-deploy.yml
```
