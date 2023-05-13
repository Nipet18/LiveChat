import React from 'react';

const UserTable = ({ username, room }) => {
    return (
        <div>
            <h2>Username: {username}</h2>
            <h2>Room: {room}</h2>
        </div>
    );
}

export default UserTable;
