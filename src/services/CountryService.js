import {requestInstance} from "../config/requestInstance.js";
import CountryModel from "./models/CountryModel.js";

class CountryService {

    api = {
        main: '/countries'
    }

    getAll(){
        return requestInstance.get(this.api.main)
            .then(r => r?.data.data.map(item => new CountryModel(item)))
            .catch(err => Promise.reject(err))
    }
}

export const countryService = new CountryService();