import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface UserContextType {
  roomId: string;
  username: string;
  updateUser: (newRoomId: string, newUsername: string) => void;
}

const UserContext = createContext<UserContextType>({
  roomId: '',
  username: '',
  updateUser: () => {},
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load the roomId and username from localStorage or default to empty strings
  const [roomId, setRoomId] = useState<string>(localStorage.getItem('roomId') || '');
  const [username, setUsername] = useState<string>(localStorage.getItem('username') || '');

  // Update localStorage whenever the roomId or username changes
  useEffect(() => {
    localStorage.setItem('roomId', roomId);
  }, [roomId]);

  useEffect(() => {
    localStorage.setItem('username', username);
  }, [username]);

  const updateUser = (newRoomId: string, newUsername: string) => {
    setRoomId(newRoomId);
    setUsername(newUsername);
  };

  return (
    <UserContext.Provider value={{ roomId, username, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => useContext(UserContext);
