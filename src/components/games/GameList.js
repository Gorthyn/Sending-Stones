import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteGame, getGames, createGame, updateGameDetails } from "../../managers/GameManager"
import "./Games.css"

export const GameList = () => {
    const [ games, setGames ] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        getGames().then(gameData => {
            if(Array.isArray(gameData)) {
                const sortedData = gameData.sort((a, b) => a.name.localeCompare(b.name))
                setGames(sortedData)
            } else {
                console.error('Error: Game data is not an array', gameData);
            }
        }).catch(error => console.error('Error fetching games:', error));
    }, [])
    

    const handleDeleteGame = (gameId) => {
        if(window.confirm("Are you sure you want to delete this game?")) {
            deleteGame(gameId)
            .then(() => {
                getGames().then((gameData) => setGames(gameData))
            })
        }
    }

    return (
        <>
            <article className="add__home_games">
                <button className="add__games_button" onClick={() => navigate("/game/new")}>Create New Game</button>
            </article>
            <article className="games">
            {
                games.map(game => {
                    return (
                        <section key={`game--${game.id}`} className="game">
                            <section className="game__header">
                                <div className="game__title" onClick={() => navigate(`/game/${game.id}`)}>{game.name}</div>
                            </section>
                            <section className="game__description">
                                <p>{game.description.substring(0, 100)}...</p>
                            </section>
                            <section className="action__buttons_container">
                                <button className="action__button" onClick={() => navigate(`/game/${game.id}/edit`)}>Edit</button>
                                <button className="action__button" onClick={() => {handleDeleteGame(game.id)}}>Delete</button>
                            </section>
                        </section>
                    )
                })
            }
            </article>
        </>
    )
}
