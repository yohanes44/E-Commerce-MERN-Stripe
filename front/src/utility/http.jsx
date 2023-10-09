


import axios from 'axios';

export const backEndBaseURL = "https://localhost:3005/api";
const backEndGraphQLURL = "http://localhost:3005/api/graphql";

export default backEndGraphQLURL;

export const axiosInstance = axios.create({
    baseURL: backEndBaseURL, 
    timeout: 5000 
});





