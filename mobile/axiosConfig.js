import axios from 'axios';

const Mobile = 'http://192.168.1.118:8000'
const LOCAL = 'http://10.0.2.2:8000'
//Need to change event source url
const axiosInstance = axios.create({
    baseURL: Mobile,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
