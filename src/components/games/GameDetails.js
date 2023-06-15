import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleGame } from "../../managers/GameManager";
import { getTopics } from "../../managers/TopicManager";
import "./Games.css"

export const GameDetails = () => {
    const [ game, setGame ] = useState({});
    const [ topics, setTopics ] = useState([]);
    const { gameId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getSingleGame(gameId)
            .then(gameData => setGame(gameData))
            .catch(err => console.error(err));
    }, [gameId]);

    useEffect(() => {
        getTopics(gameId)
            .then(topicData => {
                if(Array.isArray(topicData)) {
                    const sortedData = topicData.sort((a, b) => a.name.localeCompare(b.name))
                    setTopics(sortedData)
                } else {
                    console.error('Error: Topic data is not an array', topicData);
                }
            })
            .catch(error => console.error('Error fetching topics:', error));
    }, [gameId]);

    return (
        <article className="games">
        <section className="game">
            <section className="game__header">
                <div 
                    className="game__title" 
                    onClick={() => navigate(`/game/${game.id}/edit`)}
                    style={{ cursor: 'pointer' }}>
                    {game.name}
                </div>
            </section>
            <section className="game__description">
                <p>{game.description}</p>
            </section>
            <h3 className="topic__header">Topics:</h3>
            <ul>
                {topics.map(topic => (
                    <li key={topic.id}>
                        <h3 className="topic__title" onClick={() => navigate(`/game/${game.id}/topic/${topic.id}`)}>{topic.name}</h3>
                        <p>{topic.description.substring(0, 100)}...</p>
                    </li>
                ))}
            </ul>
            <section className="action__buttons_container">
                <button className="action__button" onClick={() => navigate(`/game/${game.id}/topic/new`)}>New Topic</button>
                <button className="action__button" onClick={() => navigate(`/game/${gameId}/players`)}>Players</button>
            </section>
        </section>
        </article>
    )
}
