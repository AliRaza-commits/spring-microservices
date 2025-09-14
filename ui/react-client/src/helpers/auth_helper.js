import { useKeycloak } from "@react-keycloak/web";
import { UserManager } from "oidc-client";

// const settings = {
//     authority: "http://localhost:8080/realms/frontend1",
//     client_id: "frontend_client",
//     redirect_uri: "http://localhost:3000/signin-callback.html",
//     response_type: "code",
//     scope: "openid profile email students.read"
// }

// const userManager = new UserManager(settings);

export const PrivateRoute = ({children}) => {
    const { keycloak } = useKeycloak();
    const isLogged = keycloak.authenticated;
    return isLogged ? children:null;
}

// export const getUser = () => {
//     return userManager.getUser();
// }

// export const login = () => {
//     return userManager.signinRedirect();
// }

// export const logout = () => {
//     return userManager.signoutRedirect();
// }