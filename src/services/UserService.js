import {requestInstance} from "../config/requestInstance";
import UserModel from "./models/UserModel.js";

class UserService {

    api = {
        account: '/account',
        main: '/users',
        customers: '/customers'
    }

    params = {
        search: "search="
    }

    getCurrentUserData() {
        return requestInstance.get(this.api.account)
            .then(r => {
                return new UserModel(r.data)
            })
            .catch(err => Promise.reject(err))
    }

    getAll(query) {
        const queryParam = query?.length > 0 ? `?${this.params.search}${query}` : '';
        return requestInstance.get(`${this.api.customers}${queryParam}`)
            .then(r => r?.data?.data?.map(item => new UserModel(item)))
            .catch(err => Promise.reject(err))
    }

    get(id){
        return requestInstance.get(`${this.api.main}/${id}`)
            .then(r => new UserModel(r.data))
            .catch(err => Promise.reject(err))
    }

    add(data){
        const formData = {...data};
        return requestInstance.post(this.api.main, formData)
            .then(r => new UserModel(r.data))
            .catch(err => Promise.reject(err))
    }

    edit(data){
        const formData = {...data};
        return requestInstance.put(`${this.api.main}/${data?.id}`, formData)
            .then(r => new UserModel(r.data))
            .catch(err => Promise.reject(err))
    }

    delete(id){
        return requestInstance.delete(`${this.api.main}/${id}`)
            .then(r => new UserModel(r.data))
            .catch(err => Promise.reject(err))
    }

}

export const userService = new UserService();