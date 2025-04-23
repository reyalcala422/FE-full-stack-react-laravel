import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate  } from 'react-router-dom';


axios.defaults.withCredentials = true;

const Login = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const loginUser = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/login', form);
            Cookies.set('api_token', response.data.token, { expires: 1 });
            alert('Login successful');
            // redirect to dashboard or home
            // npm install @inertiajs/react
            // yarn add @inertiajs/react

            navigate('/dash-board');
        } catch (error) {
            alert('Login failed');
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="block mb-2 p-2 w-full border rounded" />
            <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="block mb-4 p-2 w-full border rounded" />
            <button onClick={loginUser} className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
        </div>
    );
};

export default Login;
