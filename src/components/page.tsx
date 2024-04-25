import React, { useState, ChangeEvent } from 'react';
import { useUser } from './userContext'; // Adjust the path if necessary
import {useNavigate } from 'react-router-dom';

const Room: React.FC = () => {
  const { roomId,username, updateUser } = useUser();
  const [newRoomId, setNewRoomId] = useState<string>(''); // State to hold the new room ID input
  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewRoomId(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateUser(newRoomId,username);
    navigate('/board');
    setNewRoomId('');
  };

  return (
    <div>
      <p>Current Room ID: {roomId}</p>
      <p>{username}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newRoomId}
          onChange={handleChange}
          placeholder="Enter new Room ID"
        />
        <button type="submit">Change Room ID</button>
      </form>
    </div>
  );
};

export default Room;
