import axios from "axios";
import {storageService} from "../services/StorageService.js";
import {storageKeys} from "./config";

export const requestInstance = axios.create();

requestInstance.defaults.baseURL = 'https://rentacarapi.amplitudo.me/api/'
requestInstance.defaults.headers['Accept'] = "application/json";

requestInstance.interceptors.request.use(
    async (config) => {
        config.headers.Authorization = storageService.exists(storageKeys.USER) ?
            `Bearer ${storageService.get(storageKeys.USER)}`
            : 'undefined';
        return config;
    },
    (error) => {
        Promise.reject(error)
    }
)