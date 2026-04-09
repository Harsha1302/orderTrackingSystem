# 📦 Modern SaaS Order Tracking System

Welcome to the Order Tracking System! This project is a fully functional, full-stack web application designed with a premium, modern SaaS (Software as a Service) aesthetic. It enables administrators or end-users to create, track, and manage orders effortlessly while enjoying a highly interactive and fluid user experience.

---

## 🌟 Key Features

* **Real-time Synchronization:** Built-in dashboard polling automatically syncs updates across the server every few seconds without needing a browser refresh.
* **Fluid Layout Animations:** Powered by **Framer Motion**, UI interactions—such as form expanding/collapsing, route transitions, and card re-arrangements during order deletion—feel completely frictionless.
* **Dynamic Status Tracking:** Orders follow a rigid operational workflow (`Placed` → `Packed` → `Shipped` → `Delivered`), enhanced with dynamic CSS gradients and glowing keyframe animations upon order completion.
* **Modern Design System:** Completely custom CSS-variables approach utilizing Glassmorphism design philosophies, zero-utility class bloat, and smooth pastel gradient configurations.
* **Single-Server Deployment Flow:** The Node.js server seamlessly compiles and distributes the React frontend as static assets, meaning the entire full-stack application relies on just one unified deployment service.

---

## 🛠️ Technology Stack

**Frontend (Client)**
* **React.js (Vite)** – Component-driven architecture.
* **Framer Motion** – Complex layout transitions and presence tracking.
* **React Router DOM** – Intelligent client-side routing.
* **Lucide React** – Clean, lightweight, open-source iconography.
* **Vanilla Modern CSS** – Custom CSS properties (Vars), Flexbox/Grid layouts, and Keyframe animations.
* **React Hot Toast** – Notification system.

**Backend (Server)**
* **Node.js runtime**
* **Express.js** – REST API handling.
* **SQLite3** – Lightweight, persistent relational database using on-disk storage.

---

## 🚀 Getting Started Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 1. Clone & Install
```bash
# Clone the repository
git clone https://github.com/Harsha1302/orderTrackingSystem.git

# Navigate into the project root
cd orderTrackingSystem

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies (open a new terminal or navigate back)
cd ../frontend
npm install
```

### 2. Run the Application (Development Mode)
You will need two separate terminal windows for the cleanest development experience:

**Terminal 1 (Backend API)**
```bash
cd backend
npm start
# Server runs on http://localhost:5001
```

**Terminal 2 (Frontend Client)**
```bash
cd frontend
npm run dev
# Vite runs on http://localhost:5173
```

> Launch your browser and navigate to `http://localhost:5173` to see the application!

---

## 🏗️ Project Architecture

```
orderTrackingSystem/
│
├── backend/                  # Express API & DB
│   ├── data/                 # SQLite database storage (Generated on runtime)
│   ├── database.js           # SQLite Initialization & Schema
│   ├── server.js             # Main server logic & REST Endpoints
│   └── package.json
│
├── frontend/                 # React UI
│   ├── src/
│   │   ├── components/       # Reusable components (OrderItem, ProgressTracker)
│   │   ├── pages/            # View-level components (Login, Dashboard)
│   │   ├── App.jsx           # AnimatePresence and Router Logic
│   │   ├── index.css         # The complete Design System
│   │   └── main.jsx
│   ├── vite.config.js        # Configured to proxy /api to the backend
│   └── package.json
│
├── render.yaml               # Deployment configuration for PaaS (Render)
└── package.json              # Root compilation configurations
```

---

## 🌐 Deployment Ready (Production)

This repository includes a `render.yaml` configuration specific to [Render.com](https://render.com). 
It configures a **Web Service** backed by a **Persistent Disk** (named `sqlite-data`) so that the local SQLite database is never wiped out between server sleeps. Render executes the root `npm run build` script, compiling the frontend automatically behind the scenes into the Express server.

---

*This project was developed as a technical evaluation / internship assessment. Focus was heavily placed on UI/UX standards, state management, and reliable backend infrastructure.*
