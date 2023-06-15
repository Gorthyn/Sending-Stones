import { useState, useEffect } from 'react';
import { getUsers, createInvitation } from '../../managers/InvitationManager';
import { useNavigate, useParams } from 'react-router-dom';

export const InvitationForm = ({ game }) => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const { gameId } = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        getUsers().then(users => {
            setUsers(users);
        });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(selectedUser)
        const newInvitation = {
            receiver: selectedUser,
            status: 'pending',
            game: parseInt(gameId)
        };

        createInvitation(newInvitation)
            .then(() => {
                alert('User invited to game.');
                navigate(`/game/${gameId}`);
            })
            .catch(error => {
                console.error('Error sending invitation:', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Invite a player to your game</h2>
            <label htmlFor="user-select">Select a player:</label>
            <select id="user-select" value={selectedUser} onChange={e => setSelectedUser(e.target.value)}>
                <option value="">--Please choose an option--</option>
                {users.map(user => (
                    <option key={user.id} value={user.id}>{user.username}</option>
                ))}
            </select>
            <button type="submit">Invite</button>
        </form>
    );
};
