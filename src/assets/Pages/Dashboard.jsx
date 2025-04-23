
import React, { useEffect, useState } from 'react';
import axios from './utils/axios'
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';


const Dashboard = () => {
    const [posts, setPosts] = useState([]);
    const [query, setQuery] = useState('');

    const navigate = useNavigate();
    const logout = () => {
        Cookies.remove('api_token');
        navigate('/login');
    };
    const fetchPosts = async () => {
        try {
            const response = await axios.get('/posts/index'); // No need for full URL
            setPosts(response.data);
        } catch (err) {
            console.error('Error fetching posts:', err);
        }
    };

    useEffect(() => {
        fetchPosts();
        const interval = setInterval(fetchPosts, 1000); // Poll every 5 seconds
        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(query.toLowerCase())
    );

    return (


        <div className="p-4">
            <input
                className="border p-2 mb-4 w-full"
                placeholder="Search posts..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={logout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
                Logout
            </button>
            {filteredPosts.map(post => (
                <div key={post.id} className="border p-4 rounded mb-4 shadow">
                    <h2 className="text-xl font-bold">{post.title}</h2>
                    <p>{post.content}</p>
                    <p className="text-sm text-gray-500">By {post.user?.name ?? 'Unknown'}</p>
                    <div className="mt-2 flex gap-2">
                        <Link to={`/posts/${post.id}`} className="text-blue-600 underline">View</Link>
                        <Link to={`/posts/edit/${post.id}`} className="text-yellow-600 underline">Edit</Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Dashboard;