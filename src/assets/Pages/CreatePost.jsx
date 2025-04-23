import React, { useState } from 'react';
import axios from './utils/axios'
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const [form, setForm] = useState({ title: '', content: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/posts', form);
            navigate('/dash-board');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Create New Post</h2>
            <input
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                className="w-full p-2 border mb-3"
            />
            <textarea
                placeholder="Content"
                value={form.content}
                onChange={e => setForm({ ...form, content: e.target.value })}
                className="w-full p-2 border mb-3"
            />
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Create</button>
        </form>
    );
};

export default CreatePost;
