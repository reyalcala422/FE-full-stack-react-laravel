// src/api/axios.js
import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
    baseURL: 'http://localhost:8000/api', // 👈 Set your Laravel API base URL here
});

// Automatically attach the token to every request if available
instance.interceptors.request.use((config) => {
    const token = Cookies.get('api_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default instance;