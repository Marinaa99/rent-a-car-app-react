import {requestInstance} from "../config/requestInstance";
import AuthModel from "./models/AuthModel";

class AuthService {

    api = {
        login: '/login',
        logout: '/logout',
    }

    login(email, password){
        const formData = {
            "email": email,
            "password": password
        };
        return requestInstance.post(this.api.login, formData)
            .then(r => {
                return new AuthModel(r.data.data)
            })
            .catch(err => Promise.reject(err));
    }

}

export const authService = new AuthService();