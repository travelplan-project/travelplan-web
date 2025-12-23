import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8081/api' // URL da sua API no Eclipse
});

export default api;