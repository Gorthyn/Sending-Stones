import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deleteTopic, getSingleTopic } from "../../managers/TopicManager";
import { getPosts } from "../../managers/PostManager";
import './Topics.css'

export const TopicDetails = () => {
    const [ topic, setTopic ] = useState({});
    const [ posts, setPosts ] = useState([]);
    const { topicId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getSingleTopic(topicId)
            .then(topicData => {
                setTopic(topicData);
                setIsLoading(false);
            })
            .catch(err => console.error(err));
    }, [topicId]);

    useEffect(() => {
        getPosts(topicId)
            .then(postData => {
                if(Array.isArray(postData)) {
                    const sortedData = postData.sort((a, b) => a.name.localeCompare(b.name))
                    setPosts(sortedData)
                } else {
                    console.error('Error: Post data is not an array', postData);
                }
            })
            .catch(error => console.error('Error fetching posts:', error));
    }, [topicId]);

    const handleDeleteTopic = (topicId) => {
        if(window.confirm("Are you sure you want to remove this topic?")) {
            deleteTopic(topicId)
            .then(() => {
                navigate(`/game/${topic.game.id}`)
            })
        }
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }
    
    return (
        <article className="topics">
        <section className="topic">
            <section className="topic__header">
                <div className="topic__title" onClick={() => navigate(`/topic/${topic.id}/edit`)}>{topic.name}</div>
            </section>
            <section className="topic__description">
                <p>{topic.description}</p>
            </section>
            <h3 className="post__header">Posts:</h3>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <h4 className="post__title" onClick={() => navigate(`/post/${post.id}`)}>{post.name}</h4>
                        <p>{post.content.substring(0, 100)}...</p>
                    </li>
                ))}
            </ul>
            <section className="action__buttons_container">
                <button className="action__button" onClick={() => navigate(`/game/${topic.game.id}`)}>Back to Game</button>
                {(topic.gamer?.id === topic.game?.game_master?.id
                    ? <button className="action__button" onClick={() => navigate(`/topic/${topicId}/edit`)}>Edit Topic</button>
                    : ""
                )}
                {(topic.gamer?.id === topic.game?.game_master?.id
                    ? <button className="action__button" onClick={() => {handleDeleteTopic(topic.id)}}>Remove Topic</button>
                    : ""
                )}
                <button className="action__button" onClick={() => navigate(`/topic/${topicId}/post/new`)}>New Post</button>
            </section>
        </section>
        </article>
    )
}
