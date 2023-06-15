export const getGames = () => {
    return fetch("http://localhost:8000/game", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("ss_token")}`
        }
    })
        .then(response => response.json())
}

export const getSingleGame = (gameId) => {
    return fetch(`http://localhost:8000/game/${gameId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("ss_token")}`
        }
    })
        .then(response => response.json())
}

export const createGame = (game) => {
    return fetch("http://localhost:8000/game", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("ss_token")}`
        },
        body: JSON.stringify(game)
    })
        .then(res => res.json())
}

export const deleteGame = (gameId) => {
    return fetch(`http://localhost:8000/game/${gameId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("ss_token")}`
        }
    })
}

export const updateGame = (game) => {
    return fetch(`http://localhost:8000/game/${game.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("ss_token")}`
        },
        body: JSON.stringify(game)
    })
}
