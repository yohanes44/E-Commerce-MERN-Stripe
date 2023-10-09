


import axios from 'axios';

export default axios.create({
    baseURL: 'https://localhost:3005/api', 
    timeout: 5000 
});

