import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface UserContextType {
  roomId: string;
  updateUser: (newRoomId: string) => void;
}

const UserContext = createContext<UserContextType>({
  roomId: '',
  updateUser: () => {},
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load the roomId from localStorage or default to an empty string
  const [roomId, setRoomId] = useState<string>(localStorage.getItem('roomId') || '');

  // Update localStorage whenever the roomId changes
  useEffect(() => {
    localStorage.setItem('roomId', roomId);
  }, [roomId]);

  const updateUser = (newRoomId: string) => {
    setRoomId(newRoomId);
  };

  return (
    <UserContext.Provider value={{ roomId, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => useContext(UserContext);
