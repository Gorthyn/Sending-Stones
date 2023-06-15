import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { getSingleGame, updateGame } from '../../managers/GameManager';
import "./Games.css"

export const GameEditForm = () => {
    const [gameName, setGameName] = useState("");
    const [gameDescription, setGameDescription] = useState("");
    const { gameId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getSingleGame(gameId)
            .then(game => {
                setGameName(game.name);
                setGameDescription(game.description);
            })
            .catch(err => console.error(err));
    }, [gameId]);

    const handleGameNameChange = event => {
        setGameName(event.target.value);
    }

    const handleGameDescriptionChange = event => {
        setGameDescription(event.target.value);
    }

    const handleSubmit = event => {
        event.preventDefault();

        const game = {
            id: gameId,
            name: gameName,
            description: gameDescription
        };

        updateGame(game)
            .then(response => {
                if(response.hasOwnProperty('error')){
                    console.error(response.error);
                } else {
                    setGameName("");
                    setGameDescription("");
                    navigate('/');
                }
            })
            .catch(error => console.error('Error:', error));
    }

    return (
        <div className="form__container">
            <form onSubmit={handleSubmit}>
                <label>
                    Game Name:
                    <input type="text" value={gameName} onChange={handleGameNameChange} />
                </label>

                <label>
                    Game Description:
                    <textarea value={gameDescription} onChange={handleGameDescriptionChange} />
                </label>

                <input type="submit" value="Update Game" />
            </form>
        </div>
    );
};