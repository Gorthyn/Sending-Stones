import { useState } from 'react';
import { createGame } from '../../managers/GameManager';
import { useNavigate } from 'react-router-dom';
import "./Games.css"

export const GameForm = () => {
    const navigate = useNavigate();
    const [gameName, setGameName] = useState("");
    const [gameDescription, setGameDescription] = useState("");

    const handleGameNameChange = event => {
        setGameName(event.target.value);
    }

    const handleGameDescriptionChange = event => {
        setGameDescription(event.target.value);
    }

    const handleSubmit = event => {
        event.preventDefault();

        const game = {
            name: gameName,
            description: gameDescription
        };

        createGame(game)
            .then(response => {
                if(response.hasOwnProperty('error')){
                    console.error(response.error);
                } else {
                    setGameName("");
                    setGameDescription("");
                    navigate("/");
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

                <input type="submit" value="Create Game" />
            </form>
        </div>
    );
};
