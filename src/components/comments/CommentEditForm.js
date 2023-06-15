import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSingleComment, updateComment } from '../../managers/CommentManager';

export const CommentEditForm = () => {
    const { commentId, postId } = useParams();
    const [ comment, setComment ] = useState({ content: "", image_url: "", post: postId });
    const navigate = useNavigate();

    useEffect(() => {
        getSingleComment(commentId).then(setComment);
    }, [commentId]);

    const handleInputChange = (event) => {
        const updatedComment = { ...comment };
        updatedComment[event.target.id] = event.target.value;
        setComment(updatedComment);
    };

    const handleClickSaveComment = () => {
        updateComment(comment)
            .then(() => navigate(`/post/${postId}`))
            .catch(error => console.log(error));
    };

    return (
        <form className="commentForm">
            <h2 className="commentForm__title">Edit Your Notes</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="content">Comment content:</label>
                    <textarea id="content" className="form-control" value={comment.content} onChange={handleInputChange}  required></textarea>
                    <label htmlFor="image_url">Image URL:</label>
                    <input type="text" id="image_url" className="form-control" value={comment.image_url} onChange={handleInputChange} />
                </div>
            </fieldset>
            <button className="action__button" onClick={handleClickSaveComment}>Save Comment</button>
            <button className="action__button" onClick={() => navigate(`/post/${comment.post.id}`)}>Cancel</button>
        </form>
    );
}
