import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333',      /* PARTE DA URL QUE VAI SER MANTIDA EM TODAS AS CHAMAS*/
})

export default api;
