import React from 'react';
import './Input.css';

const Input = ({ message, setMessage, sendMessage }) => {
	const handleSend = (event) => {
		sendMessage(event);
		setMessage('');
	}

	return (
		<form className="form">
			<input
				className="input"
				type="text"
				placeholder="Type a message..."
				value={message}
				onChange={(event) => setMessage(event.target.value)}
				onKeyPress={(event) => event.key === 'Enter' ? handleSend(event) : null}
			/>
			<button className="sendButton" onClick={(event) => handleSend(event)}>Send</button>
		</form>
	)
}

export default Input;
