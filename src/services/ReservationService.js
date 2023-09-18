import {requestInstance} from "../config/requestInstance";
import ReservationModel from "./models/ReservationModel.js";

class ReservationService {

    api = {
        main: '/reservations'
    }

    params = {
        dateFrom: "date_from=",
        dateTo: "date_to="
    }

    getAll(query) {
        let queryParams = "";

        if (query?.dateFrom && query?.dateTo) {
            queryParams = `?${this.params.dateFrom}${query.dateFrom}&${this.params.dateTo}${query.dateTo}`;
        }
        return requestInstance.get(`${this.api.main}${queryParams}`)
            .then(r => r?.data?.data?.map(item => new ReservationModel(item)))
            .catch(err => Promise.reject(err))
    }


    get(id) {
        return requestInstance.get(`${this.api.main}/${id}`)
            .then(r => new ReservationModel(r.data.data))
            .catch(err => Promise.reject(err))
    }

    add(data) {
        const formData = {...data};
        return requestInstance.post(this.api.main, formData)
            .then(r => new ReservationModel(r.data.data))
            .catch(err => Promise.reject(err))
    }

    edit(data) {
        const formData = {...data};
        return requestInstance.put(`${this.api.main}/${data?.id}`, formData)
            .then(r => new ReservationModel(r.data.data))
            .catch(err => Promise.reject(err))
    }

    delete(id) {
        return requestInstance.delete(`${this.api.main}/${id}`)
            .then(r => new ReservationModel(r.data.data))
            .catch(err => Promise.reject(err))
    }

}


export const reservationService = new ReservationService();