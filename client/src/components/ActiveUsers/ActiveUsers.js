import React from 'react';
import './ActiveUsers.css';

const ActiveUsers = ({ users }) => {
    return (
        <div className="usersContainer">
        <h1 className="activeUsersHeader">Active Users</h1>
            <div className="names">
                {users.map((user, idx) => (
                    <div key={idx}>{idx+1} {user}</div>
                ))}
            </div>
        </div>
    )
}

export default ActiveUsers;