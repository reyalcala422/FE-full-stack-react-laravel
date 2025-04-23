
import React, { useEffect, useState } from 'react';
import axios from './utils/axios'
// import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';


const PostView = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const navigate = useNavigate();

    // const fetchPosts = async () => {
    //     const token = Cookies.get('api_token');
    //     try {
    //       const response = await axios.get('http://localhost:8000/api/posts', {
    //         headers: {
    //           Authorization: `Bearer ${token}`
    //         }
    //       });
    //       setPosts(response.data);
    //     } catch (err) {
    //       console.error('Error fetching posts:', err);
    //     }
    //   };

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`/posts/${id}`);
                setPost(response.data);
            } catch (err) {
                console.error('Error fetching post:', err);
            }
        };
        fetchPost();
    }, [id]);
    const handleDelete = async () => {
        const confirm = window.confirm('Are you sure you want to delete this post?');
        if (!confirm) return;

        try {
            await axios.delete(`/posts/delete/${id}`);
            alert('Post deleted');
            navigate('/dash-board');
        } catch (err) {
            console.error('Delete failed:', err);
            alert('Could not delete post');
        }
    };
    const handleUpdate = async () => {
        try {
            const updatedPost = { ...post, content: 'Updated content!' }; // Update logic
            const response = await axios.put(`/posts/${id}`, updatedPost);
            setPost(response.data); // Update post in UI
        } catch (err) {
            console.error('Error updating post:', err);
        }
    };
    if (!post) return <p>Loading...</p>;

    return (
        <div className="p-4">
            <div className="space-y-4">
                <div className="card">
                    <div className="card-body">
                        <h1 className="text-2xl font-bold">{post.title}</h1>
                        <p>{post.content}</p>
                        <p className="text-sm text-gray-600">Written by: {post.user ? post.user.name : 'Unknown'}</p>
                        <button onClick={handleUpdate} className="btn btn-secondary mt-4">
                            Update Post
                        </button>
                        <button onClick={handleDelete} className="btn btn-danger mt-4 ml-4">
                            Delete Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostView;

