# 🧺 HostelHub – Washing Machine Management System

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-blue?style=for-the-badge&logo=vercel)](https://hostel-hub-alpha.vercel.app/)

HostelHub is a full-stack web application built for hostel residents to manage washing machine usage. It allows students to check real-time machine availability, book slots, and track active washing sessions across multiple floors. It simplifies resource management and improves the washing experience in shared accommodations.

🔗 **Live Demo:** https://hostel-hub-alpha.vercel.app/

## 🚀 Features

- ✅ **Real-time Status Tracking** – Live updates on machine availability every 30 seconds
- 📅 **Smart Booking System** – Easily book and manage washing sessions
- 🏢 **Multi-Floor Management** – Manage machines by floor location
- ⏳ **Session Monitoring** – View active and completed washing sessions
- 📱 **Fully Responsive** – Optimized for both desktop and mobile devices
- 🔄 **Auto Refresh** – Seamless updates without needing a manual reload

## 🛠️ Tech Stack

### 🔹 Frontend
- React.js (with Vite)
- Tailwind CSS
- Axios

### 🔸 Backend
- Node.js
- Express.js
- MongoDB (with Mongoose)
- RESTful APIs with CORS

## 📁 Project Structure

```
HostelHub/
├── Frontend/                # React frontend
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── services/        # Axios service layer
│   │   └── assets/          # Static images & styles
│   └── public/
│
├── Backend/                 # Express backend
│   ├── controllers/         # Logic for routes
│   ├── models/              # Mongoose schemas
│   ├── routes/              # API endpoints
│   └── db/                  # MongoDB connection config
```

## ⚙️ Getting Started

### ✅ Prerequisites

- Node.js v14 or higher
- MongoDB (local or cloud)
- npm or yarn

### 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tek-wizard/HostelHub.git
   cd HostelHub
   ```

2. **Set up the Backend**
   ```bash
   cd Backend
   npm install
   ```
   
   Create a `.env` file in `Backend/` with:
   ```env
   PORT=8000
   MONGO_URI=your_mongodb_connection_string
   ```

3. **Set up the Frontend**
   ```bash
   cd ../Frontend
   npm install
   ```
   
   Create a `.env` file in `Frontend/` with:
   ```env
   VITE_API_URL=https://your-backend-url.onrender.com
   ```

### ▶️ Running Locally

**Start Backend:**
```bash
cd Backend
npm run dev
```

**Start Frontend:**
```bash
cd ../Frontend
npm run dev
```

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:8000

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/sessions/machine-status` | Get the status of all machines |
| POST | `/api/sessions/create` | Create a new washing session |
| GET | `/api/sessions/active` | Get currently active sessions |
| GET | `/api/sessions/all` | Get all sessions (admin view) |
| DELETE | `/api/sessions/:id` | Delete an existing session |

## 🖼️ Screenshots

<!-- Add your screenshots here -->
### 🧮 Dashboard
<img width="1465" alt="Screenshot 2025-05-25 at 12 36 09 PM" src="https://github.com/user-attachments/assets/1e2ab955-843b-4d5f-b416-633c742baea9" />


### 📅 Booking Screen
<img width="700" alt="Screenshot 2025-05-25 at 12 37 05 PM" src="https://github.com/user-attachments/assets/4372e4c4-0978-4508-a6ee-13132783074e" />



### 📱 Mobile View
<img width="343" alt="Screenshot 2025-05-25 at 12 38 41 PM" src="https://github.com/user-attachments/assets/9c69948a-8a17-450d-8f34-04773589d29e" />


## 🚀 Deployment Guide

### 🔧 Backend – Render

1. Create a new Web Service
2. Connect your GitHub repository and choose `/Backend`
3. Set the **Build Command:** `npm install`
4. Set the **Start Command:** `npm run dev` or `node server.js`
5. Add Environment Variables:
   - `MONGO_URI`
   - `PORT=8000`
6. Deploy and note your backend URL (e.g., `https://hostelhub-backend.onrender.com`)

### 🧭 Frontend – Vercel or Render Static Site

#### Option 1: Deploy on Vercel
1. Import GitHub repo into Vercel
2. Set the root directory to `Frontend/`
3. Define Environment Variable:
   ```env
   VITE_API_URL=https://your-backend-url.onrender.com
   ```
4. Build & deploy

#### Option 2: Deploy on Render (Static Site)
1. Create new Static Site
2. Choose `/Frontend` as the root
3. **Build command:** `npm install && npm run build`
4. **Publish directory:** `dist`
5. Add Environment Variable:
   ```env
   VITE_API_URL=https://your-backend-url.onrender.com
   ```

## 🧪 Troubleshooting

### Frontend not getting data?
- Ensure `VITE_API_URL` is set before running `npm run build`
- Backend CORS must allow your frontend domain:
  ```javascript
  const cors = require('cors');
  app.use(cors({ origin: 'https://your-frontend.vercel.app' }));
  ```

### MongoDB not connecting on Render?
- Use a cloud-hosted MongoDB URI, not localhost
- Prefer MongoDB Atlas

## 🤝 Contributing

1. Fork the project
2. Create your feature branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Open a Pull Request

## 👥 Contributors

- [**tek-wizard**](https://github.com/tek-wizard)
- [**Raghavendra1729-cell**](https://github.com/Raghavendra1729-cell)
- [**Shrivalkumar**](https://github.com/Shrivalkumar)
- [**Pratham-Onkar-Singh**](https://github.com/Pratham-Onkar-Singh)

## 🙌 Acknowledgments

- React and TailwindCSS communities
- MongoDB & Mongoose documentation
- Vercel & Render deployment platforms

---

⭐ **Star this repository if you found it helpful!**
