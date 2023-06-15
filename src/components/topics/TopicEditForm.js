import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleTopic, updateTopic } from '../../managers/TopicManager';
import './Topics.css'

export const TopicEditForm = () => {
    const navigate = useNavigate();
    const { topicId } = useParams();
    const [topic, setTopic] = useState({ name: '', description: '', game: '' });

    useEffect(() => {
        getSingleTopic(topicId)
            .then((topic) => {
                setTopic(topic);
            })
            .catch((error) => {
                console.error(error);
            });
        }, [topicId]);

    const handleChange = (event) => {
        const { id, value } = event.target;
        setTopic((prevTopic) => ({
            ...prevTopic,
            [id]: value,
        }));
    };

    const handleSave = () => {
        updateTopic(topic)
            .then(() => navigate(`/game/${topic.game}/topic/${topicId}`))
            .catch((error) => {
                console.error(error);
        });
    };
    
    return (
        <form>
            <label htmlFor="name">Topic Name:</label>
            <input type="text" id="name" onChange={handleChange} value={topic.name} required />
    
            <label htmlFor="description">Topic Description:</label>
            <textarea id="description" onChange={handleChange} value={topic.description} required></textarea>
    
            <button type="button" className="action__button" onClick={handleSave}>Save Topic</button>
            <button type="button" className="action__button" onClick={() => navigate(`/game/${topic.game.id}`)}>Cancel</button>
        </form>
    );
};  
