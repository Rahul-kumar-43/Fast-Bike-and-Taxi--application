// ApiService.js - Service for making authenticated API requests

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

// Helper function to get stored token
const getToken = () => localStorage.getItem('token');

// Function to handle fetch calls with authentication
const fetchWithAuth = async (url, options = {}) => {
    const token = getToken();
    
    const defaultHeaders = {
        'Content-Type': 'application/json',
    };
    
    // Add authorization header if token exists
    if (token) {
        defaultHeaders['Authorization'] = `Bearer ${token}`;
    }
    
    // Merge default headers with any provided headers
    const mergedOptions = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...(options.headers || {})
        }
    };
    
    try {
        const response = await fetch(`${API_URL}${url}`, mergedOptions);
        
        // If unauthorized (token expired or invalid), redirect to login
        if (response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('isLoggedIn');
            window.location.href = '/login';
            return null;
        }
        
        // Parse JSON if response is ok
        if (response.ok) {
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            }
            return await response.text();
        }
        
        // Handle error responses
        const error = await response.json();
        throw new Error(error.message || 'Something went wrong');
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
};

// Define API methods
const ApiService = {
    // Admin APIs
    adminLogin: (credentials) => {
        return fetch(`${API_URL}/adminLogin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        }).then(res => res.json());
    },
    
    // Get all drivers (requires admin authentication)
    getAllDrivers: () => {
        return fetchWithAuth('/admin/getAllDrivers');
    },
    
    // Get driver by ID (requires admin authentication)
    getDriverById: (id) => {
        return fetchWithAuth(`/admin/getDriver/${id}`);
    },
    
    // Add a new driver (requires admin authentication)
    addDriver: (driverData) => {
        return fetchWithAuth('/admin/addDriver', {
            method: 'POST',
            body: JSON.stringify(driverData)
        });
    },
    
    // Update a driver (requires admin authentication)
    updateDriver: (id, driverData) => {
        return fetchWithAuth(`/admin/updateDriver/${id}`, {
            method: 'PUT',
            body: JSON.stringify(driverData)
        });
    },
    
    // Delete a driver (requires admin authentication)
    deleteDriver: (id) => {
        return fetchWithAuth(`/admin/deleteDriver/${id}`, {
            method: 'DELETE'
        });
    },
    
    // Driver/Biketaxi APIs
    biketaxiLogin: (credentials) => {
        return fetch(`${API_URL}/biketaxi/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        }).then(res => res.json());
    },
    
    // Register a new bike taxi driver (public endpoint)
    registerBiketaxi: (driverData) => {
        return fetch(`${API_URL}/addBiketaxi`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(driverData)
        }).then(res => res.json());
    },
    
    // Get bike taxi driver profile (requires driver authentication)
    getBiketaxiProfile: (id) => {
        return fetchWithAuth(`/getBiketaxi/${id}`);
    },

    // Messages / Contact APIs
    getAllMessages: (type = 'ALL') => {
        const url = type === 'ALL' ? '/api/contact/admin/messages' : `/api/contact/admin/messages/type/${type}`;
        return fetchWithAuth(url);
    },

    deleteMessage: (id) => {
        return fetchWithAuth(`/api/contact/admin/messages/${id}`, {
            method: 'DELETE'
        });
    },

    submitContact: (contactData) => {
        return fetchWithAuth('/api/contact/submit', {
            method: 'POST',
            body: JSON.stringify(contactData)
        });
    },
    
    // Logout function (client-side only)
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userType');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('adminUsername');
        
        // Redirect to login page
        window.location.href = '/login';
    }
};

export default ApiService;
