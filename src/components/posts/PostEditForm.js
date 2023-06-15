import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updatePost, getSinglePost } from '../../managers/PostManager';
import './Posts.css';

export const PostEditForm = () => {
    const navigate = useNavigate();
    const { postId } = useParams();
    const [ post, setPost ] = useState({ name: '', content: '', image_url: '', topic: postId });

    useEffect(() => {
        getSinglePost(postId).then(setPost);
    }, [postId]);

    const handleChange = (event) => {
        const updatedPost = { ...post };
        updatedPost[event.target.id] = event.target.value;
        setPost(updatedPost);
    };

    const handleSave = () => {
        updatePost(post)
            .then(() => navigate(`/post/${postId}`))
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

            <button type="button" className="action__button" onClick={handleSave}>Save Post</button>
            <button type="button" className="action__button" onClick={() => navigate(`/post/${postId}`)}>Cancel</button>
        </form>
    );
}
