import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createTopic } from '../../managers/TopicManager';
import './Topics.css'

export const TopicForm = () => {
    const navigate = useNavigate();
    const { gameId } = useParams();
    const [ topic, setTopic ] = useState({ name: '', description: '', game: gameId });

    const handleChange = (event) => {
        const newTopic = { ...topic };
        newTopic[event.target.id] = event.target.value;
        setTopic(newTopic);
    };

    const handleSave = () => {
        createTopic(topic)
            .then(() => navigate(`/game/${gameId}`))
            .catch(err => console.error(err));
    };

    return (
        <form>
            <label htmlFor="name">Topic Name:</label>
            <input type="text" id="name" onChange={handleChange} value={topic.name} required />
            
            <label htmlFor="description">Topic Description:</label>
            <textarea id="description" onChange={handleChange} value={topic.description} required></textarea>

            <button type="button" className="action__button" onClick={handleSave}>Save Topic</button>
            <button type="button" className="action__button"
            onClick={() => navigate(`/game/${gameId}`)}>Cancel</button>
        </form>
    );
}
