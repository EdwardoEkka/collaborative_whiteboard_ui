import React, { useEffect } from 'react';
import Keycloak from 'keycloak-js';


const keycloak = new Keycloak({
  realm: 'myrealm',
  url: 'http://localhost:8080',
  clientId: 'myclient',
});

const Authen: React.FC = () => {
  useEffect(() => {
    const initKeycloak = async () => {
      try {
        const authenticated = await keycloak.init({ onLoad: 'login-required' });
        if (authenticated) {
          console.log('User is authenticated');
        } else {
          console.log('User is not authenticated');
        }
      } catch (error) {
        console.error('Failed to initialize Keycloak', error);
      }
    };

    initKeycloak();
  }, []);

  const logout = () => {
    keycloak.logout();
  };

  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Authen;
