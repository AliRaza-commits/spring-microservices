import Keycloak from "keycloak-js";


        const keycloak = new Keycloak({
            realm: 'microservice',
            url:'http://localhost:9090',
            clientId:'frontend'
        });

export default keycloak;