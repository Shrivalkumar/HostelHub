import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; 
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';

import sessionRoutes from './routes/session.Routes.js';
import connectMongoDB from './db/connectMongoDB.js';

// Load environment variables
dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Security middleware
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false
}));

// Enable compression
app.use(compression());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// CORS configuration
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://hostelhub-frontend.onrender.com', 'http://localhost:8000', 'http://localhost:5173', 'https://hostelhub.onrender.com']
        : ['http://localhost:5173', 'http://localhost:8000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
};
app.use(cors(corsOptions));

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    console.log('Request Body:', req.body);
    next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// API routes
app.use("/api/sessions", sessionRoutes);

// Serve frontend static files in production
if (process.env.NODE_ENV === 'production') {
    const frontendPath = path.resolve(__dirname, '../Frontend/dist');
    console.log('Serving frontend from:', frontendPath);
    
    // Serve static files
    app.use(express.static(frontendPath));

    // Serve index.html for all non-API routes (client-side routing)
    app.get('*', (req, res) => {
        if (!req.path.startsWith('/api')) {
            res.sendFile(path.join(frontendPath, 'index.html'));
        } else {
            res.status(404).json({ message: 'API route not found' });
        }
    });
}

// 404 handler - only used if not in production mode
if (process.env.NODE_ENV !== 'production') {
    app.use((req, res, next) => {
        res.status(404).json({ message: 'Route not found' });
    });
}

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

const startServer = async () => {
    try {
        // Connect to MongoDB
        await connectMongoDB();
        
        // Start the server
        const server = app.listen(PORT, () => {
            console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode`);
            console.log(`Server is running on port ${PORT}`);
            if (process.env.NODE_ENV === 'production') {
                console.log(`Frontend is being served from: ${path.resolve(__dirname, '../Frontend/dist')}`);
            }
        });

        // Handle server shutdown gracefully
        process.on('SIGTERM', () => {
            console.log('SIGTERM received. Shutting down gracefully...');
            server.close(() => {
                console.log('Server closed');
                process.exit(0);
            });
        });

    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

startServer();