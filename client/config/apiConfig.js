import axios from "axios";





export let usserManagement = axios.create({
    baseURL: config[config.all.env].apiBaseUserManagement
});