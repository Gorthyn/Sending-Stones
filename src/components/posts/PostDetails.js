import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { deletePost, getSinglePost } from "../../managers/PostManager";
import { getComments, deleteComment } from "../../managers/CommentManager";
import './Posts.css';

export const PostDetails = () => {
    const { postId } = useParams();
    const [ post, setPost ] = useState({});
    const [ comments, setComments ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getSinglePost(postId)
            .then(postData => {
                setPost(postData);
                setIsLoading(false);
            })
            .catch(err => console.error(err));
    
        getComments(postId)
            .then(setComments)
            .catch(err => console.error(err));
    }, [postId]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handleDeletePost = (postId) => {
        if(window.confirm("Are you sure you want to remove this post?")) {
            deletePost(postId)
            .then(() => {
                navigate(`/game/${post.topic.game.id}/topic/${post.topic.id}`)
            })
        }
    }

    return (
        <div className="post">
            <h2>{post.name}</h2>
            <p>{post.content}</p>
            <img src={post.image_url} alt={post.name} />
            <div className="action__buttons_container">
                <button className="action__button" onClick={() => navigate(`game/${post.game}/topic/${post.topic.id}`)}>Back to Topic</button>
                {(post.gamer.id === post.topic.game.game_master.id
                    ? <button className="action__button" onClick={() => navigate(`/post/${postId}/edit`)}>Edit Post</button>
                    : ""
                )}
                {(post.gamer.id === post.topic.game.game_master.id
                    ? <button className="action__button" onClick={() => {handleDeletePost(post.id)}}>Remove Post</button>
                    : ""
                )}
                <button className="action__button" onClick={() => navigate(`/post/${postId}/comment/new`)}>Write Note</button>
            </div>
            {comments.map(comment => (
                <div className="comment-card" key={comment.id}>
                    <h3>{comment.name}</h3>
                    <p>{comment.content}</p>
                    <p>By: {comment.gamer.user.username}</p>
                    <p>Posted on {new Date(comment.created_on).toLocaleDateString()}</p>
                    {comment.can_edit
                    ? <button className="action__button" onClick={() => navigate(`/comment/${comment.id}/edit`)}>Edit</button>
                    : ""
                    }
                    {comment.can_delete
                    ? <button className="action__button" onClick={() => {
                        deleteComment(comment.id)
                            .then(() => getComments(postId)
                                .then(setComments)
                            )
                    }}>Delete</button>
                    : ""
                    }
                </div>
            ))}
        </div>
    );
} 
