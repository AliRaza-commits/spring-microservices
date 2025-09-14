import axios from "axios";
import { getUser } from "./auth_helper";

export const studentList = (token) => {
    const headers = {
        Accept: "application/json",
        Authorization: "Bearer "+token
    }

    return axios.post("http://localhost:8222/api/v1/students/list", { headers });
}

export const callApi = () => {
    return getUser().then( user => {
        if(user && user.access_token) {
            return studentList(user.access_token).catch(error => {
                throw error;
            })
        } else {
            throw new Error("user is not logged");
        }
    })
}