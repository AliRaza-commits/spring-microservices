import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8080/realms/frontend1', // Keycloak URL
  realm: 'frontend1',
  clientId: 'frontend_client',
});

export default keycloak;