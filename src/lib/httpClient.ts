import axios from 'axios';

const httpClient = axios.create({
  baseURL: process.env.BACKEND_URL,
});

export default httpClient;