import axios from "axios";
import { HOST_API_KEY } from "./globalConfig";

const axiosInstance = axios.create({
    baseURL: HOST_API_KEY,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response) || "General Axios Error Happend")
);

export default axiosInstance;