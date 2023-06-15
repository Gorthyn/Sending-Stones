import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createPost } from '../../managers/PostManager';
import './Posts.css';

export const PostForm = () => {
    const navigate = useNavigate();
    const { topicId, gameId } = useParams();
    const [ post, setPost ] = useState({ name: '', content: '', image_url: '', topic: topicId });

    const handleChange = (event) => {
        const newPost = { ...post };
        newPost[event.target.id] = event.target.value;
        setPost(newPost);
    };

    const handleSave = () => {
        createPost(post)
            .then(() => navigate(`/game/${gameId}/topic/${topicId}`))
            .catch(err => console.error(err));
    };

    return (
        <form>
            <label htmlFor="name">Post Name:</label>
            <input type="text" id="name" onChange={handleChange} value={post.name} required />
        
            <label htmlFor="content">Post Content:</label>
            <textarea id="content" onChange={handleChange} value={post.content} required></textarea>
            
            <label htmlFor="image_url">Image URL:</label>
            <input type="text" id="image_url" onChange={handleChange} value={post.image_url} />

            <button type="button"
            className="action__button" onClick={handleSave}>Save Post</button>
            <button type="button" 
            className="action__button" onClick={() => navigate(`/game/${gameId}/topic/${topicId}`)}>Cancel</button>
        </form>
    );
}
