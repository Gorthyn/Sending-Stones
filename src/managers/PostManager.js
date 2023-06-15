export const getPosts = (topicId) => {
    return fetch(`http://localhost:8000/post?topic=${topicId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("ss_token")}`
        }
    })
        .then(response => response.json())
}

export const getSinglePost = (postId) => {
    return fetch(`http://localhost:8000/post/${postId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("ss_token")}`
        }
    })
        .then(response => response.json())
}

export const createPost = (post) => {
    return fetch("http://localhost:8000/post", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("ss_token")}`
        },
        body: JSON.stringify(post)
    })
        .then(res => res.json())
}

export const deletePost = (postId) => {
    return fetch(`http://localhost:8000/post/${postId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("ss_token")}`
        }
    })
}

export const updatePost = (post) => {
    return fetch(`http://localhost:8000/post/${post.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("ss_token")}`
        },
        body: JSON.stringify(post)
    })
}
