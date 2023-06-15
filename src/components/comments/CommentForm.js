import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createComment } from '../../managers/CommentManager';

export const CommentForm = () => {
    const { postId } = useParams();
    const [ comment, setComment ] = useState({ content: "", image_url: "", post: postId });
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const newComment = { ...comment };
        newComment[event.target.id] = event.target.value;
        setComment(newComment);
    };

    const handleClickSaveComment = () => {
        createComment(comment)
            .then(() => navigate(`/post/${postId}`))
            .catch(error => console.log(error));
    };

    return (
        <form className="commentForm">
            <h2 className="commentForm__title">New Note</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="content">Comment content:</label>
                    <textarea id="content" className="form-control" value={comment.content} onChange={handleInputChange}  required></textarea>
                    <label htmlFor="image_url">Image URL:</label>
                    <input type="text" id="image_url" className="form-control" value={comment.image_url} onChange={handleInputChange} />
                </div>
            </fieldset>
            <button className="button" onClick={handleClickSaveComment}>Save Comment</button>
            <button className="button" onClick={() => navigate(`/post/${postId}`)}>Cancel</button>
        </form>
    );
}
