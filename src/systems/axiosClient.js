import axios from 'axios';

const axiosClient = axios.create({
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' }
});

export default axiosClient;
