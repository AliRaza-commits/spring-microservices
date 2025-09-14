import React, { useEffect, useState } from 'react';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from '../config/keycloak';
import axios from 'axios';

function WelcomePage() {
  const [message, setMessage] = useState('');

  const fetchResource = async () => {
    try {
      const token = keycloak.token;
      console.log("token : "+token);
      const response = await axios.get('http://localhost:8081/api/hello', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      setMessage(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (keycloak.authenticated) {
      fetchResource();
    }
  }, [keycloak.authenticated]);

  return (
    <ReactKeycloakProvider authClient={keycloak}>
      <div>
        <h1>React with Keycloak</h1>
        {keycloak.authenticated ? (
          <div>
            <p>Welcome {keycloak.tokenParsed.preferred_username}</p>
            <p>API Response: {message}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </ReactKeycloakProvider>
  );
}

export default WelcomePage;
