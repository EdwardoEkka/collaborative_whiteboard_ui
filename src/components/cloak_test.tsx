import React, { useEffect } from 'react';
import Keycloak from 'keycloak-js';
import Room from './page';
import { useUser } from './userContext'; 
const keycloak = new Keycloak({
  realm: 'myrealm',
  url: 'http://localhost:8080',
  clientId: 'myclient',
});

const Authen: React.FC = () => {
  const { updateUser } = useUser(); 

  useEffect(() => {
    const initKeycloak = async () => {
      try {
        const authenticated = await keycloak.init({ onLoad: 'login-required' });
        if (authenticated) {
          console.log('User is authenticated');
          await keycloak.loadUserInfo(); 
          const username = keycloak.tokenParsed?.preferred_username; 
          if (username) {
            updateUser('', username); 
          } else {
            console.error('Failed to get username from token');
          }
        } else {
          console.log('User is not authenticated');
        }
      } catch (error) {
        console.error('Failed to initialize Keycloak', error);
      }
    };

    initKeycloak();
  }, [updateUser]); 
  const logout = () => {
    keycloak.logout();
  };

  return (
    <div>
      <button onClick={logout}>Logout</button>
      <Room/>
    </div>
  );
};

export default Authen;
