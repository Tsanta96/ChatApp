import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import peachIcon from '../../icons/PeachFalcRed.png';

//Refactor styles using Grid and SCSS
import './Join.css';

//When user joins, a connection event is fired up to backend
// When user leaves, a disconnect event is fired up to backend

const Join = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return (
       <div className="joinOuterContainer"> 
        <img 
                src={peachIcon}
                className="peachImage"
            />
            <p className="chatHeader">Peachtree Chats</p>
            <div className="chatHeaderUnderline"></div>
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                <div>
                    <input 
                        placeholder="Name"
                        className="joinInput"
                        type="text"
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
                <div>
                    <input 
                        placeholder="Room"
                        className="joinInput mt-20"
                        type="text"
                        onChange={(event) => setRoom(event.target.value)}
                    />
                </div>
                <Link 
                    onClick={(event) => (!name || !room) ? event.preventDefault() : null}
                    to={`/chat?name=${name}&room=${room}`}>
                    <button className="button mt-20" type="submit">Sign In!</button>
                </Link>
            </div>
       </div>
    )
}

export default Join;