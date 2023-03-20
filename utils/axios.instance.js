import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: '/api',
    timeout: 60*1000
});

export default axiosInstance;

