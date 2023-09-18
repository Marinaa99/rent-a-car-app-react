import CityModel from "./models/CityModel";
import {requestInstance} from "../config/requestInstance";

class CityService {
    api = {
        main: '/cities',
    }



    getAll(){
        return requestInstance.get(this.api.main)
            .then(r => r?.data.data.map(item => new CityModel(item)))
            .catch(err => Promise.reject(err))
    }


}

export const cityService = new CityService();