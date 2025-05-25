import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import sessionRoutes from './routes/session.Routes.js';
import connectMongoDB from './db/connectMongoDB.js';

// Load environment variables
dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');


// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true}));


// API routes
app.use("/api/sessions", sessionRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        message: err.message || 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
});

const PORT = process.env.PORT || 8000;

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(rootDir, "Frontend/dist")));
  
    app.get("*", (req, res) => {
      res.sendFile(path.join(rootDir, "Frontend/dist/index.html"));
    });
  }
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} http://localhost:${PORT}/`);
    connectMongoDB(); // once our server is runnning we can connect out database
  });
  