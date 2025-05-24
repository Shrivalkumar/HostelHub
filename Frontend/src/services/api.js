import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

// Request interceptor for logging
api.interceptors.request.use(
    (config) => {
        console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, config.data);
        return config;
    },
    (error) => {
        console.error('❌ API Request Error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor for logging and error handling
api.interceptors.response.use(
    (response) => {
        console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, response.data);
        return response;
    },
    async (error) => {
        console.error('❌ API Response Error:', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
            url: error.config?.url
        });

        // If the error is due to network issues, retry the request
        if (!error.response && error.config && error.config.retryCount < 3) {
            error.config.retryCount = error.config.retryCount || 0;
            error.config.retryCount++;
            
            // Wait for 1 second before retrying
            await new Promise(resolve => setTimeout(resolve, 1000));
            return api(error.config);
        }

        return Promise.reject(error);
    }
);

// API functions
export const sessionAPI = {
    // Get machine status
    getMachineStatus: async () => {
        try {
            const response = await api.get('/sessions/machine-status');
            return response.data;
        } catch (error) {
            console.error('Failed to fetch machine status:', error);
            throw new Error(error.response?.data?.message || 'Failed to fetch machine status');
        }
    },

    // Create new session
    createSession: async (sessionData) => {
        try {
            const response = await api.post('/sessions/create', sessionData);
            return response.data;
        } catch (error) {
            console.error('Failed to create session:', error);
            throw new Error(error.response?.data?.message || 'Failed to create session');
        }
    },

    // Delete session
    deleteSession: async (sessionId) => {
        try {
            const response = await api.delete(`/sessions/${sessionId}`);
            return response.data;
        } catch (error) {
            console.error('Failed to delete session:', error);
            throw new Error(error.response?.data?.message || 'Failed to delete session');
        }
    },

    // Get all sessions
    getAllSessions: async () => {
        try {
            const response = await api.get('/sessions/all');
            return response.data;
        } catch (error) {
            console.error('Failed to fetch all sessions:', error);
            throw new Error(error.response?.data?.message || 'Failed to fetch sessions');
        }
    },

    // Get active sessions
    getActiveSessions: async () => {
        try {
            const response = await api.get('/sessions/active');
            return response.data;
        } catch (error) {
            console.error('Failed to fetch active sessions:', error);
            throw new Error(error.response?.data?.message || 'Failed to fetch active sessions');
        }
    }
};

export default api; 