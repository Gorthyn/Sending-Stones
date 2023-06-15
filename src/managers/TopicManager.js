export const getTopics = (gameId) => {
    return fetch(`http://localhost:8000/topic?game=${gameId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("ss_token")}`
        }
    })
        .then(response => response.json())
}

export const getSingleTopic = (topicId) => {
    return fetch(`http://localhost:8000/topic/${topicId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("ss_token")}`
        }
    })
        .then(response => response.json())
}

export const createTopic = (topic) => {
    return fetch("http://localhost:8000/topic", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("ss_token")}`
        },
        body: JSON.stringify(topic)
    })
        .then(res => res.json())
}

export const deleteTopic = (topicId) => {
    return fetch(`http://localhost:8000/topic/${topicId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("ss_token")}`
        }
    })
}

export const updateTopic = (topic) => {
    let topicCopy = {...topic};

    if (typeof topicCopy.game === 'object' && topicCopy.game !== null) {
        topicCopy.game = topicCopy.game.id;
    }

    return fetch(`http://localhost:8000/topic/${topicCopy.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("ss_token")}`
        },
        body: JSON.stringify(topicCopy)
    })
}