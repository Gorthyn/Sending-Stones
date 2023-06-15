export const getUsers = () => {
    return fetch("http://localhost:8000/users", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("ss_token")}`
        }
    })
        .then(response => response.json())
}

export const getInvitations = () => {
    return fetch(`http://localhost:8000/invitations`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("ss_token")}`
        }
    })
        .then(response => response.json())
}

export const createInvitation = (invitation) => {
    return fetch(`http://localhost:8000/invitations`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("ss_token")}`
        },
        body: JSON.stringify(invitation)
    })
        .then(res => res.json())
}

export const updateInvitation = (invitationId) => {
    return fetch(`http://localhost:8000/invitations/${invitationId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("ss_token")}`
        },
        body: JSON.stringify(invitationId)
    })
}

export const deleteInvitation = (invitationId) => {
    return fetch(`http://localhost:8000/invitations/${invitationId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("ss_token")}`
        }
    })
}
