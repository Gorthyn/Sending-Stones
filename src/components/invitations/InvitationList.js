import { useEffect, useState } from 'react';
import { getInvitations, updateInvitation, deleteInvitation } from '../../managers/InvitationManager';

export const InvitationList = () => {
    const [invitations, setInvitations] = useState([]);

    useEffect(() => {
        getInvitations()
            .then(setInvitations);
    }, []);

    const acceptInvitation = (invitation) => {
        console.log(invitation)
        updateInvitation(invitation.id, { ...invitation, status: 'accepted' })
            .then(() => {
                setInvitations(invitations.filter(i => i.id !== invitation.id));
            });
    };    

    const rejectInvitation = (invitation) => {
        deleteInvitation(invitation.id)
            .then(() => {
                setInvitations(invitations.filter(i => i.id !== invitation.id));
            });
    };

    return (
        <div>
            <h2>Your Invitations</h2>
            {invitations.map(invitation => (
                <div key={invitation.id}>
                    <p>Game: {invitation.game?.name} | Sender: {invitation.sender.user.username}</p>
                    <button onClick={() => acceptInvitation(invitation)}>Accept</button>
                    <button onClick={() => rejectInvitation(invitation)}>Reject</button>
                </div>
            ))}
        </div>
    );
};
