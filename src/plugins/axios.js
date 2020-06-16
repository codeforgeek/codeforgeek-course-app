import axios from "axios";

// DEFAULT CONFIG
const config = {
    baseURL:window.apiUrl,
    timeout: 30000,
    headers: {
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json"
    }
};
// INSTANCE
const $axios = axios.create(config);

export default $axios;    
