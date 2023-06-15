export const getComments = (postId) => {
    return fetch(`http://localhost:8000/comment?post=${postId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("ss_token")}`
        }
    })
        .then(response => response.json())
}

export const getSingleComment = (commentId) => {
    return fetch(`http://localhost:8000/comment/${commentId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("ss_token")}`
        }
    })
        .then(response => response.json())
}

export const createComment = (comment) => {
    return fetch("http://localhost:8000/comment", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("ss_token")}`
        },
        body: JSON.stringify(comment)
    })
        .then(res => res.json())
}

export const deleteComment = (commentId) => {
    return fetch(`http://localhost:8000/comment/${commentId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("ss_token")}`
        }
    })
    .then(getComments)
}

export const updateComment = (comment) => {
    return fetch(`http://localhost:8000/comment/${comment.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("ss_token")}`
        },
        body: JSON.stringify(comment)
    })
}
