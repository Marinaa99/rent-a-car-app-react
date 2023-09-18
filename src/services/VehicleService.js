import {requestInstance} from "../config/requestInstance";
import VehicleModel from "./models/VehicleModel.js";

class VehicleService {

    api = {
        main: '/vehicles'
    }

    params = {
        search: "search=",
    };

    getAll(query) {
        const queryParam = query?.length > 0 ? `?${this.params.search}${query}` : '';
        return requestInstance.get(`${this.api.main}${queryParam}`)
            .then(r =>  query
                ? r?.data.data.map((item) => new VehicleModel(item))
                : r?.data?.map((item) => new VehicleModel(item)))
            .catch(err => Promise.reject(err))
    }

    get(id) {
        return requestInstance.get(`${this.api.main}/${id}`)
            .then(r => new VehicleModel(r.data.data))
            .catch(err => Promise.reject(err))
    }

    add(data) {
        const formData = {...data};
        return requestInstance.post(this.api.main, formData)
            .then(r => new VehicleModel(r.data))
            .catch(err => Promise.reject(err))
    }

    edit(data) {
        const formData = {...data};
        return requestInstance.put(`${this.api.main}/${data?.id}`, formData)
            .then(r => new VehicleModel(r.data.data))
            .catch(err => Promise.reject(err))
    }

    delete(id) {
        return requestInstance.delete(`${this.api.main}/${id}`)
            .then(r => new VehicleModel(r.data))
            .catch(err => Promise.reject(err))
    }

}


export const vehicleService = new VehicleService();