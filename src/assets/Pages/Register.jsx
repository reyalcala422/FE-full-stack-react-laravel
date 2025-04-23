import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.withCredentials = true;

const Register = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '', password_confirmation: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const registerUser = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register', form);
            Cookies.set('api_token', response.data.token, { expires: 7 });
            alert('Registered successfully');
            // redirect to dashboard or login
        } catch (error) {
            alert('Registration failed');
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} className="block mb-2 p-2 w-full border rounded" />
            <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="block mb-2 p-2 w-full border rounded" />
            <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="block mb-4 p-2 w-full border rounded" />
            <input type="password" name="password_confirmation" placeholder="Password" value={form.password_confirmation} onChange={handleChange} className="block mb-4 p-2 w-full border rounded" />
            <button onClick={registerUser} className="bg-blue-600 text-white px-4 py-2 rounded">Register</button>
        </div>
    );
};

export default Register;
